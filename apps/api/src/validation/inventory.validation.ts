import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import { inventories } from "@/schema/inventory.schema";

export const inventoryBaseSchema = createInsertSchema(inventories, {
	productId: z.uuid(),
	init: z.int().nonnegative(),
	received: z.int().nonnegative(),
	used: z.int().nonnegative(),
	backLoad: z.int().nonnegative(),
	note: z.string().optional(),
	sectionId: z.uuid(),
});

export const inventorySchema = inventoryBaseSchema.pick({
	productId: true,
	init: true,
	received: true,
	used: true,
	backLoad: true,
	note: true,
	sectionId: true,
});

export type Inventory = z.infer<typeof inventorySchema>;
