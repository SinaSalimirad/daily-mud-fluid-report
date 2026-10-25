import { inventorySchema } from "@/validation/inventory.validation";

export const InventoryModel = {
	create: inventorySchema,
} as const;
