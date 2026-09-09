import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

const id = () => text("id").primaryKey();
const audit = { createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`), updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`) };

export const locals = sqliteTable("locals", {
  id: id(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  ...audit,
});

export const appUsers = sqliteTable("app_users", {
  id: id(),
  externalId: text("external_id").notNull().unique(),
  email: text("email").notNull(),
  displayName: text("display_name").notNull(),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  ...audit,
});

export const roles = sqliteTable("roles", { id: id(), code: text("code").notNull().unique(), name: text("name").notNull(), ...audit });
export const permissions = sqliteTable("permissions", { id: id(), code: text("code").notNull().unique(), name: text("name").notNull(), ...audit });
export const userRoles = sqliteTable("user_roles", { userId: text("user_id").notNull(), roleId: text("role_id").notNull(), localId: text("local_id"), ...audit });
export const rolePermissions = sqliteTable("role_permissions", { roleId: text("role_id").notNull(), permissionId: text("permission_id").notNull(), ...audit });

export const products = sqliteTable("products", {
  id: id(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull().default("OTROS"),
  unit: text("unit").notNull(),
  minimumStock: real("minimum_stock").notNull().default(0),
  weightPerUnit: real("weight_per_unit"),
  ownProduct: integer("own_product", { mode: "boolean" }).notNull().default(true),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  ...audit,
});

export const suppliers = sqliteTable("suppliers", { id: id(), name: text("name").notNull(), taxId: text("tax_id"), phone: text("phone"), email: text("email"), notes: text("notes"), active: integer("active", { mode: "boolean" }).notNull().default(true), ...audit });

export const recipes = sqliteTable("recipes", { id: id(), saleProductId: text("sale_product_id").notNull(), name: text("name").notNull(), active: integer("active", { mode: "boolean" }).notNull().default(true), ...audit });
export const recipeLines = sqliteTable("recipe_lines", { id: id(), recipeId: text("recipe_id").notNull(), ingredientProductId: text("ingredient_product_id").notNull(), quantity: real("quantity").notNull(), unit: text("unit").notNull(), ...audit });

export const stockPeriods = sqliteTable("stock_periods", { id: id(), localId: text("local_id").notNull(), type: text("type").notNull(), startDate: text("start_date").notNull(), endDate: text("end_date").notNull(), status: text("status").notNull().default("OPEN"), closedAt: text("closed_at"), ...audit });
export const stockMovements = sqliteTable("stock_movements", { id: id(), localId: text("local_id").notNull(), periodId: text("period_id"), productId: text("product_id").notNull(), type: text("type").notNull(), quantity: real("quantity").notNull(), unit: text("unit").notNull(), bar: text("bar"), reference: text("reference"), occurredAt: text("occurred_at").notNull(), userId: text("user_id").notNull(), ...audit });
export const physicalCounts = sqliteTable("physical_counts", { id: id(), localId: text("local_id").notNull(), periodId: text("period_id").notNull(), productId: text("product_id").notNull(), quantity: real("quantity").notNull(), countedAt: text("counted_at").notNull(), userId: text("user_id").notNull(), ...audit });

export const purchases = sqliteTable("purchases", { id: id(), localId: text("local_id").notNull(), supplierId: text("supplier_id").notNull(), invoiceNumber: text("invoice_number"), purchaseDate: text("purchase_date").notNull(), dueDate: text("due_date"), status: text("status").notNull().default("PENDING"), total: real("total").notNull().default(0), notes: text("notes"), ...audit });
export const purchaseLines = sqliteTable("purchase_lines", { id: id(), purchaseId: text("purchase_id").notNull(), productId: text("product_id").notNull(), quantity: real("quantity").notNull(), unit: text("unit").notNull(), unitCost: real("unit_cost").notNull(), ...audit });
export const payments = sqliteTable("payments", { id: id(), localId: text("local_id").notNull(), supplierId: text("supplier_id"), purchaseId: text("purchase_id"), type: text("type").notNull(), amount: real("amount").notNull(), paymentDate: text("payment_date").notNull(), notes: text("notes"), ...audit });

export const accountingEntries = sqliteTable("accounting_entries", { id: id(), localId: text("local_id").notNull(), type: text("type").notNull(), category: text("category").notNull(), description: text("description").notNull(), amount: real("amount").notNull(), entryDate: text("entry_date").notNull(), status: text("status").notNull().default("CONFIRMED"), ...audit });
export const sales = sqliteTable("sales", { id: id(), localId: text("local_id").notNull(), source: text("source").notNull(), externalId: text("external_id"), saleDate: text("sale_date").notNull(), productId: text("product_id").notNull(), quantity: real("quantity").notNull(), total: real("total"), rawData: text("raw_data"), ...audit });
export const auditLog = sqliteTable("audit_log", { id: id(), userId: text("user_id").notNull(), action: text("action").notNull(), entity: text("entity").notNull(), entityId: text("entity_id"), details: text("details"), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`) });
