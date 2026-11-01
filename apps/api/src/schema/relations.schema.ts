import { relations } from "drizzle-orm";
import { inventories } from "./inventory.schema";
import { products } from "./product.schema";
import { sections } from "./section.schema";
import { wells } from "./well.schema";

export const inventoriesRelations = relations(inventories, ({ one }) => ({
	products: one(products, {
		fields: [inventories.productId],
		references: [products.id],
	}),

	section: one(sections, {
		fields: [inventories.sectionId],
		references: [sections.id],
	}),
}));

export const productsRelations = relations(products, ({ many }) => ({
	inventories: many(inventories),
}));

export const sectionsRelations = relations(sections, ({ one, many }) => ({
	well: one(wells, {
		fields: [sections.wellId],
		references: [wells.id],
	}),
	inventories: many(inventories),
}));

export const wellsRelations = relations(wells, ({ many }) => ({
	sections: many(sections),
}));
