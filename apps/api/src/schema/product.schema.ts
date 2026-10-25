import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import { timestamps, uuidv7 } from "./_shared/columns";
import { ProductOrigin, ProductUnit } from "./enums.schema";

export const ProductUnitEnum = pgEnum("product_unit", ProductUnit);
export const ProductOriginEnum = pgEnum("product_origin", ProductOrigin);

export const products = pgTable("products", (t) => ({
	id: uuidv7,
	name: t.varchar("name", { length: 255 }).notNull().unique(),
	quantity: t.doublePrecision("quantity").notNull(),
	width: t.doublePrecision("width"),
	height: t.doublePrecision("height"),
	unit: ProductUnitEnum("unit").notNull(),
	sg: t.doublePrecision("sg"),
	origin: ProductOriginEnum("origin").notNull(),
	unitPrice: t.doublePrecision("unit_price"),
	...timestamps,
}));
