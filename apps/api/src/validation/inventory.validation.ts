import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import { inventories } from "@/schema/inventory.schema";

export const inventoryBaseSchema = createInsertSchema(inventories, {
	productName: z.string().min(1),
	init: z.number().nonnegative(),
	received: z.number().nonnegative(),
	used: z.number().nonnegative(),
	backLoad: z.number().nonnegative(),
});

export const inventorySchema = inventoryBaseSchema.pick({
	productName: true,
	init: true,
	received: true,
	used: true,
	backLoad: true,
});

export type Inventory = z.infer<typeof inventorySchema>;
