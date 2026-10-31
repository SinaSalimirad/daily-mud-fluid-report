import { db } from "@/config/db.config";
import { inventories } from "@/schema/inventory.schema";
import type { Inventory } from "../validation/inventory.validation";

export async function insertInventory(data: Inventory) {
	const [inventory] = await db.insert(inventories).values(data).returning();

	return inventory;
}

export async function findInventories() {
	return await db.select().from(inventories);
}
