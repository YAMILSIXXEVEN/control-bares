"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  BarChart3,
  Bell,
  Boxes,
  Building2,
  Calculator,
  ChevronRight,
  FileBarChart,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  PackageCheck,
  Receipt,
  Settings2,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Users,
  WalletCards,
  X,
} from "lucide-react";

type User = { userId: string; displayName: string; email: string; fullName: string | null };
type Props = { user: User; signOutPath: string };
type Item = { id: string; label: string; detail: string; icon: typeof LayoutDashboard; group: string };

const items: Item[] = [
  { id: "home", label: "Base principal", detail: "Vista general del sistema", icon: LayoutDashboard, group: "Centro de control" },
  { id: "stock", label: "Stock", detail: "Conteos y diferencias", icon: Boxes, group: "Operaciones" },
  { id: "purchases", label: "Compras", detail: "Órdenes y recepciones", icon: ShoppingCart, group: "Operaciones" },
  { id: "production", label: "Producción", detail: "Lotes y recetas", icon: PackageCheck, group: "Operaciones" },
  { id: "waste", label: "Decomisos", detail: "Pérdidas y motivos", icon: Receipt, group: "Operaciones" },
  { id: "sales", label: "Ventas", detail: "FUDO y ventas", icon: BarChart3, group: "Operaciones" },
  { id: "suppliers", label: "Proveedores", detail: "Precios y cuentas", icon: Truck, group: "Administración" },
  { id: "accounting", label: "Contabilidad", detail: "Ingresos y egresos", icon: Calculator, group: "Administración" },
  { id: "costs", label: "CMV y costos", detail: "Costos y valorización", icon: WalletCards, group: "Administración" },
  { id: "reports", label: "Informes", detail: "Reportes operativos", icon: FileBarChart, group: "Administración" },
  { id: "users", label: "Usuarios y roles", detail: "Accesos por local", icon: Users, group: "Configuración" },
  { id: "settings", label: "Configuración", detail: "Parámetros del sistema", icon: Settings2, group: "Configuración" },
];

export default function Dashboard({ user, signOutPath }: Props) {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const current = items.find((item) => item.id === active) ?? items[0];
  const groups = ["Centro de control", "Operaciones", "Administración", "Configuración"];
  const navigate = (id: string) => { setActive(id); setOpen(false); };

  return (
    <main className="min-h-screen bg-[#080b10] text-[#e7fbff] selection:bg-[#ec35e9] selection:text-white">
      <div className="pointer-events-none fixed inset-0 opacity-[.08] scanlines" />
      <div className="flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-30 flex w-[280px] flex-col border-r-2 border-[#193641] bg-[#0e131a] transition-transform lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="border-b-2 border-[#193641] px-5 pb-4 pt-3">
            <div className="relative mx-auto h-[130px] w-[150px] overflow-hidden border-2 border-[#263841] bg-[#0b0e13] shadow-[4px_4px_0_#06080c]">
              <img src="/raster-logo.png" alt="RASTER Bar & Club" className="h-full w-full object-cover" />
            </div>
            <div className="mt-3 flex items-center justify-between"><div><p className="font-mono text-[15px] font-black uppercase tracking-[.08em] text-[#16e0ff]">RASTER</p><p className="font-mono text-[10px] font-bold uppercase tracking-[.14em] text-[#f8e515]">Control Center</p></div><button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Cerrar menú"><X size={18} /></button></div>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-5">{groups.map((group) => <div key={group} className="mb-6"><p className="mb-2 px-3 font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#52717c]">// {group}</p><div className="space-y-1">{items.filter((item) => item.group === group).map((item) => { const Icon = item.icon; const selected = active === item.id; return <button key={item.id} onClick={() => navigate(item.id)} className={`flex w-full items-center gap-3 border-2 px-3 py-2.5 text-left font-mono transition ${selected ? "border-[#16e0ff] bg-[#12313c] text-[#16e0ff] shadow-[3px_3px_0_#ec35e9]" : "border-transparent text-[#7597a2] hover:border-[#314c56] hover:bg-[#111e26] hover:text-[#f8e515]"}`}><Icon size={16} /><span className="text-[11px] font-bold uppercase tracking-wide">{item.label}</span></button>; })}</div></div>)}</nav>
          <div className="border-t-2 border-[#193641] p-3"><div className="flex items-center gap-3 border-2 border-[#263841] bg-[#111a21] p-3"><div className="flex h-8 w-8 items-center justify-center bg-[#ec35e9] font-mono text-xs font-black text-white">{initials(user.displayName)}</div><div className="min-w-0 flex-1"><p className="truncate font-mono text-[11px] font-bold text-[#d7faff]">{user.displayName}</p><p className="font-mono text-[9px] uppercase text-[#62828c]">Player 01 · Admin</p></div><a href={signOutPath} target="_top" aria-label="Cerrar sesión" className="text-[#6f919b] hover:text-[#f8e515]"><LogOut size={15} /></a></div></div>
        </aside>
        {open && <button className="fixed inset-0 z-20 bg-black/70 lg:hidden" onClick={() => setOpen(false)} aria-label="Cerrar menú" />}
        <section className="min-w-0 flex-1">
          <header className="flex h-[82px] items-center justify-between border-b-2 border-[#193641] bg-[#0e131a] px-5 sm:px-8"><div className="flex items-center gap-3"><button className="border-2 border-[#314c56] p-2 text-[#16e0ff] hover:bg-[#12313c] lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menú"><Menu size={18} /></button><div><p className="font-mono text-[9px] font-black uppercase tracking-[.18em] text-[#ec35e9]">SECTOR // {current.group}</p><h1 className="font-mono text-lg font-black uppercase tracking-wide text-[#f8e515]">{current.label}</h1></div></div><div className="flex items-center gap-4"><div className="hidden items-center gap-2 border-2 border-[#263841] bg-[#111a21] px-3 py-2 sm:flex"><span className="h-2 w-2 animate-pulse bg-[#62ef87]" /><span className="font-mono text-[9px] font-bold uppercase text-[#83aab4]">Sistema online</span></div><button className="relative border-2 border-[#263841] p-2 text-[#16e0ff] hover:border-[#16e0ff]" aria-label="Notificaciones"><Bell size={17} /><span className="absolute -right-1 -top-1 h-2 w-2 bg-[#ec35e9]" /></button></div></header>
          <div className="mx-auto max-w-[1440px] p-5 sm:p-8">{active === "home" ? <HomeView navigate={navigate} /> : active === "stock" ? <StockView /> : <ModuleView item={current} />}</div>
        </section>
      </div>
    </main>
  );
}

function HomeView({ navigate }: { navigate: (id: string) => void }) {
  return <div className="space-y-7"><div className="flex flex-col justify-between gap-5 border-b-2 border-dashed border-[#203a44] pb-6 md:flex-row md:items-end"><div><p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#62828c]">MISSION DATE // 09.09.2026</p><h2 className="mt-3 font-mono text-3xl font-black uppercase tracking-[-.05em] text-[#16e0ff] sm:text-[40px]">Base principal</h2><p className="mt-2 max-w-2xl font-mono text-xs leading-6 text-[#8aabb3]">Centro de control para stock, compras, proveedores, producción y administración.</p></div><button onClick={() => navigate("purchases")} className="w-fit border-2 border-[#f8e515] bg-[#f8e515] px-4 py-3 font-mono text-xs font-black uppercase text-[#111318] shadow-[4px_4px_0_#ec35e9] transition hover:bg-[#fff36b]">+ Nueva compra</button></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric icon={Building2} label="Locales" value="03" note="DRYFT · RASTER · MR TASTY" color="cyan" /><Metric icon={BarChart3} label="Ventas conectadas" value="01 / 03" note="FUDO activo en DRYFT" color="magenta" /><Metric icon={ShoppingCart} label="Compras pendientes" value="--" note="Esperando base de proveedores" color="yellow" /><Metric icon={WalletCards} label="Cuentas a pagar" value="--" note="Sin movimientos cargados" color="green" /></div>
    <div className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]"><section className="pixel-card p-5 sm:p-6"><div className="mb-5 flex items-center justify-between"><div><p className="pixel-label">SELECT YOUR LOCAL</p><h3 className="mt-1 font-mono text-lg font-black uppercase text-[#f8e515]">Tus tres locales</h3></div><button onClick={() => navigate("settings")} className="font-mono text-[10px] font-bold uppercase text-[#16e0ff]">Configurar</button></div><div className="grid gap-3 md:grid-cols-3"><Local name="DRYFT" detail="Ventas conectadas con FUDO" color="border-[#f8e515]" onClick={() => navigate("sales")} /><Local name="RASTER" detail="Stock y compras independientes" color="border-[#16e0ff]" onClick={() => navigate("stock")} /><Local name="MR TASTY" detail="Stock y compras independientes" color="border-[#ec35e9]" onClick={() => navigate("stock")} /></div></section><section className="pixel-card pixel-card-magenta p-5 sm:p-6"><p className="pixel-label text-[#ff93fa]">PLAYER PROGRESS</p><h3 className="mt-1 font-mono text-lg font-black uppercase text-[#f8e515]">Base administrativa</h3><div className="mt-5 space-y-4"><Progress label="Usuarios y roles" done /><Progress label="Locales y sectores" done /><Progress label="Proveedores y compras" /><Progress label="Plan contable y gastos" /><Progress label="Productos, recetas y stock" /></div><button onClick={() => navigate("users")} className="mt-6 font-mono text-[10px] font-bold uppercase text-[#16e0ff]">Administrar accesos <ChevronRight className="inline" size={13} /></button></section></div>
    <section className="pixel-card p-5 sm:p-6"><div className="flex items-center justify-between"><div><p className="pixel-label">ACTIVITY LOG</p><h3 className="mt-1 font-mono text-lg font-black uppercase text-[#f8e515]">Todavía no hay movimientos</h3></div><FileText className="text-[#16e0ff]" size={20} /></div><div className="mt-5 border-2 border-dashed border-[#2b4d58] bg-[#0d161c] px-5 py-10 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center border-2 border-[#ec35e9] bg-[#26152a] text-[#ec35e9]"><Receipt size={21} /></div><p className="mt-4 font-mono text-xs font-black uppercase text-[#16e0ff]">La actividad aparecerá aquí</p><p className="mx-auto mt-2 max-w-md font-mono text-[10px] leading-5 text-[#7699a4]">Cuando conectemos la base de datos, este espacio mostrará compras, ventas, pagos, movimientos de stock y alertas.</p></div></section>
  </div>;
}

function ModuleView({ item }: { item: Item }) { const Icon = item.icon; return <div className="flex min-h-[620px] items-center justify-center"><div className="pixel-card max-w-lg p-8 text-center sm:p-12"><div className="mx-auto flex h-16 w-16 items-center justify-center border-2 border-[#16e0ff] bg-[#12313c] text-[#16e0ff] shadow-[4px_4px_0_#ec35e9]"><Icon size={28} /></div><p className="pixel-label mt-7">AUTHORIZED SECTOR</p><h2 className="mt-2 font-mono text-2xl font-black uppercase text-[#f8e515]">{item.label}</h2><p className="mt-3 font-mono text-xs leading-6 text-[#8aabb3]">{item.detail}. Este sector ya está reservado y será conectado a la base de datos en la siguiente etapa.</p><div className="mt-6 inline-flex items-center gap-2 border-2 border-[#2b4d58] bg-[#0d161c] px-4 py-2 font-mono text-[10px] font-bold uppercase text-[#16e0ff]"><ShieldCheck size={13} /> Acceso según rol y local</div></div></div>; }

type StockData = { locals: { id: string; name: string }[]; products: { id: string; name: string; unit: string; category: string }[]; movements: { id: string; localName: string; productName: string; type: string; quantity: number; unit: string; occurredAt: string }[] };
function StockView() {
  const [data, setData] = useState<StockData>({ locals: [], products: [], movements: [] });
  const [form, setForm] = useState({ localId: "", productId: "", type: "INGRESO", quantity: "", occurredAt: new Date().toISOString().slice(0, 16), reference: "" });
  const [message, setMessage] = useState("");
  const load = () => fetch("/api/stock").then((response) => response.json()).then((next) => { setData(next); setForm((current) => ({ ...current, localId: current.localId || next.locals[0]?.id || "", productId: current.productId || next.products[0]?.id || "" })); }).catch(() => setMessage("No se pudo cargar la base de datos"));
  useEffect(() => { load(); }, []);
  async function submit(event: FormEvent) { event.preventDefault(); setMessage(""); const response = await fetch("/api/stock", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, quantity: Number(form.quantity), occurredAt: new Date(form.occurredAt).toISOString() }) }); const result = await response.json(); if (!response.ok) { setMessage(result.error ?? "No se pudo guardar"); return; } setMessage("Movimiento guardado"); setForm((current) => ({ ...current, quantity: "", reference: "" })); load(); }
  return <div className="space-y-6"><div className="flex flex-col justify-between gap-4 border-b-2 border-dashed border-[#203a44] pb-6 md:flex-row md:items-end"><div><p className="pixel-label">OPERACIONES // STOCK</p><h2 className="mt-2 font-mono text-3xl font-black uppercase text-[#16e0ff]">Movimientos de stock</h2><p className="mt-2 font-mono text-xs text-[#8aabb3]">Carga de ingresos, producción, decomisos, ventas y comida personal.</p></div><div className="border-2 border-[#62ef87] bg-[#10291d] px-4 py-2 font-mono text-[10px] font-bold uppercase text-[#62ef87]">Base conectada</div></div>
    <form onSubmit={submit} className="pixel-card grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-6"><Field label="Local"><select value={form.localId} onChange={(e) => setForm({ ...form, localId: e.target.value })}>{data.locals.map((local) => <option key={local.id} value={local.id}>{local.name}</option>)}</select></Field><Field label="Producto"><select value={form.productId} onChange={(e) => setForm({ ...form, productId: e.target.value })}>{data.products.map((product) => <option key={product.id} value={product.id}>{product.name} · {product.unit}</option>)}</select></Field><Field label="Tipo"><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>{["INGRESO", "PRODUCCION", "DECOMISO", "VENTA", "COMIDA"].map((type) => <option key={type}>{type}</option>)}</select></Field><Field label="Cantidad"><input required min="0.01" step="0.01" type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="0,00" /></Field><Field label="Fecha y hora"><input required type="datetime-local" value={form.occurredAt} onChange={(e) => setForm({ ...form, occurredAt: e.target.value })} /></Field><div className="flex items-end"><button className="w-full border-2 border-[#f8e515] bg-[#f8e515] px-4 py-3 font-mono text-[10px] font-black uppercase text-[#111318] shadow-[3px_3px_0_#ec35e9]">Guardar movimiento</button></div>{message && <p className="font-mono text-[10px] uppercase text-[#f8e515] md:col-span-2 xl:col-span-6">{message}</p>}</form>
    <section className="pixel-card overflow-hidden"><div className="border-b-2 border-[#193641] p-5"><p className="pixel-label">ACTIVITY LOG</p><h3 className="mt-1 font-mono text-lg font-black uppercase text-[#f8e515]">Últimos movimientos</h3></div><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left font-mono text-[10px]"><thead className="bg-[#111f27] uppercase text-[#6f9aa6]"><tr><th className="p-4">Fecha</th><th className="p-4">Local</th><th className="p-4">Producto</th><th className="p-4">Tipo</th><th className="p-4 text-right">Cantidad</th></tr></thead><tbody>{data.movements.length ? data.movements.map((movement) => <tr key={movement.id} className="border-t border-[#193641] text-[#b4d0d5]"><td className="p-4">{new Date(movement.occurredAt).toLocaleString("es-AR")}</td><td className="p-4 text-[#16e0ff]">{movement.localName}</td><td className="p-4">{movement.productName}</td><td className="p-4 text-[#f8e515]">{movement.type}</td><td className="p-4 text-right">{movement.quantity} {movement.unit}</td></tr>) : <tr><td colSpan={5} className="p-10 text-center text-[#668995]">Todavía no hay movimientos cargados.</td></tr>}</tbody></table></div></section>
  </div>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><span className="mb-2 block font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#7699a4]">{label}</span><div className="[&_input]:w-full [&_input]:border-2 [&_input]:border-[#2b4d58] [&_input]:bg-[#0b1217] [&_input]:px-3 [&_input]:py-2.5 [&_input]:font-mono [&_input]:text-xs [&_input]:text-[#e7fbff] [&_select]:w-full [&_select]:border-2 [&_select]:border-[#2b4d58] [&_select]:bg-[#0b1217] [&_select]:px-3 [&_select]:py-2.5 [&_select]:font-mono [&_select]:text-xs [&_select]:text-[#e7fbff]">{children}</div></label>; }
function Metric({ icon: Icon, label, value, note, color }: { icon: typeof Building2; label: string; value: string; note: string; color: string }) { const colors: Record<string, string> = { cyan: "border-[#16e0ff] text-[#16e0ff]", magenta: "border-[#ec35e9] text-[#ec35e9]", yellow: "border-[#f8e515] text-[#f8e515]", green: "border-[#62ef87] text-[#62ef87]" }; return <div className="pixel-card p-4"><div className={`flex h-9 w-9 items-center justify-center border-2 bg-[#0d161c] ${colors[color]}`}><Icon size={17} /></div><p className="mt-4 font-mono text-[10px] font-bold uppercase text-[#7699a4]">{label}</p><p className={`mt-1 font-mono text-2xl font-black ${colors[color].split(" ")[1]}`}>{value}</p><p className="mt-1 truncate font-mono text-[9px] text-[#597883]">{note}</p></div>; }
function Local({ name, detail, color, onClick }: { name: string; detail: string; color: string; onClick: () => void }) { return <div className={`border-2 ${color} bg-[#0d161c] p-4 shadow-[3px_3px_0_#080b10]`}><div className="mb-5 font-mono text-[9px] font-bold text-[#597883]">PLAYER SLOT</div><p className="font-mono text-lg font-black text-[#16e0ff]">{name}</p><p className="mt-1 min-h-10 font-mono text-[10px] leading-5 text-[#7699a4]">{detail}</p><button onClick={onClick} className="mt-4 font-mono text-[10px] font-bold uppercase text-[#f8e515]">Abrir local <ChevronRight className="inline" size={12} /></button></div>; }
function Progress({ label, done = false }: { label: string; done?: boolean }) { return <div className="flex items-center gap-3"><span className={`flex h-4 w-4 items-center justify-center border text-[9px] font-black ${done ? "border-[#62ef87] bg-[#62ef87] text-[#080b10]" : "border-[#52717c] text-[#52717c]"}`}>{done ? "✓" : ""}</span><span className="font-mono text-[10px] uppercase text-[#9bb7be]">{label}</span><span className="ml-auto font-mono text-[9px] text-[#597883]">{done ? "READY" : "LOCKED"}</span></div>; }
function initials(value: string) { return value.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase(); }
