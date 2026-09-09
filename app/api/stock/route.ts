import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../chatgpt-auth";

type D1Result<T = Record<string, unknown>> = { results: T[] };

const seedLocals = [
  ["DRYFT", "DRYFT"],
  ["RASTER", "RASTER"],
  ["MR_TASTY", "MR TASTY"],
];

const seedProducts = [
  ["P012", "Pollo", "INSUMOS", "KG", 5],
  ["P013", "Nalga", "INSUMOS", "KG", 5],
  ["P014", "Bife Ancho", "INSUMOS", "KG", 3],
  ["P015", "Milanesa", "PRODUCCIÓN", "UNIDAD", 20],
  ["P016", "Suprema", "PRODUCCIÓN", "UNIDAD", 20],
  ["P017", "Medallones hamburguesa", "PRODUCCIÓN", "UNIDAD", 30],
  ["P018", "Muzzarella x 250", "PRODUCCIÓN", "UNIDAD", 15],
  ["P019", "Papas envasadas", "INSUMOS", "KG", 10],
  ["P020", "Huevo", "INSUMOS", "UNIDAD", 30],
  ["P021", "Limón", "INSUMOS", "KG", 2],
];

async function ensureCoreTables() {
  const statements = [
    `CREATE TABLE IF NOT EXISTS locals (id TEXT PRIMARY KEY, code TEXT NOT NULL UNIQUE, name TEXT NOT NULL, active INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
    `CREATE TABLE IF NOT EXISTS products (id TEXT PRIMARY KEY, code TEXT NOT NULL UNIQUE, name TEXT NOT NULL, category TEXT NOT NULL DEFAULT 'OTROS', unit TEXT NOT NULL, minimum_stock REAL NOT NULL DEFAULT 0, weight_per_unit REAL, own_product INTEGER NOT NULL DEFAULT 1, active INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
    `CREATE TABLE IF NOT EXISTS stock_movements (id TEXT PRIMARY KEY, local_id TEXT NOT NULL, period_id TEXT, product_id TEXT NOT NULL, type TEXT NOT NULL, quantity REAL NOT NULL, unit TEXT NOT NULL, bar TEXT, reference TEXT, occurred_at TEXT NOT NULL, user_id TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
  ];
  await env.DB.batch(statements.map((sql) => env.DB.prepare(sql)));
  await env.DB.batch(seedLocals.map(([code, name]) => env.DB.prepare("INSERT OR IGNORE INTO locals (id, code, name) VALUES (?, ?, ?)").bind(`local_${code.toLowerCase()}`, code, name)));
  await env.DB.batch(seedProducts.map(([code, name, category, unit, minimumStock]) => env.DB.prepare("INSERT OR IGNORE INTO products (id, code, name, category, unit, minimum_stock) VALUES (?, ?, ?, ?, ?, ?)").bind(`product_${code.toLowerCase()}`, code, name, category, unit, minimumStock)));
}

export async function GET() {
  await ensureCoreTables();
  const [locals, products, movements] = await env.DB.batch([
    env.DB.prepare("SELECT id, code, name FROM locals WHERE active = 1 ORDER BY name"),
    env.DB.prepare("SELECT id, code, name, category, unit, minimum_stock AS minimumStock FROM products WHERE active = 1 ORDER BY category, name"),
    env.DB.prepare("SELECT m.id, l.name AS localName, p.name AS productName, m.type, m.quantity, m.unit, m.occurred_at AS occurredAt FROM stock_movements m JOIN locals l ON l.id = m.local_id JOIN products p ON p.id = m.product_id ORDER BY m.occurred_at DESC LIMIT 25"),
  ]) as D1Result[];
  return Response.json({ locals: locals.results, products: products.results, movements: movements.results });
}

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Sesión requerida" }, { status: 401 });
  await ensureCoreTables();
  const body = await request.json() as { localId?: string; productId?: string; type?: string; quantity?: number; occurredAt?: string; reference?: string };
  if (!body.localId || !body.productId || !body.type || !body.quantity || body.quantity <= 0) return Response.json({ error: "Completá local, producto, tipo y cantidad" }, { status: 400 });
  const product = await env.DB.prepare("SELECT unit FROM products WHERE id = ? AND active = 1").bind(body.productId).first<{ unit: string }>();
  if (!product) return Response.json({ error: "Producto inválido" }, { status: 400 });
  const id = `movement_${crypto.randomUUID()}`;
  await env.DB.prepare("INSERT INTO stock_movements (id, local_id, product_id, type, quantity, unit, reference, occurred_at, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(id, body.localId, body.productId, body.type, body.quantity, product.unit, body.reference ?? null, body.occurredAt ?? new Date().toISOString(), user.userId).run();
  return Response.json({ ok: true, id });
}
