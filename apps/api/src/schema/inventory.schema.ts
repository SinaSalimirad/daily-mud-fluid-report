import { pgTable } from "drizzle-orm/pg-core";
import { timestamps, uuidv7 } from "./_shared/columns";
import { products } from "./product.schema";
// import { sections } from "./section.schema";

export const inventories = pgTable("inventories", (t) => ({
	id: uuidv7,

	// `productName` is unique and references the `name` in the products table
	productName: t
		.varchar("product_name", { length: 255 })
		.references(() => products.name)
		.notNull(),

	init: t.integer("init").default(0).notNull(),
	received: t.integer("received").default(0).notNull(),
	used: t.integer("used").default(0).notNull(),
	backLoad: t.integer("back_load").default(0).notNull(),

	// This references column for computing `Section used`
	// sectionId: t
	// 	.uuid("section_id")
	// 	.references(() => sections.id)
	// 	.notNull(),

	...timestamps,
}));
