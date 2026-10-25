import * as inventoryRepository from "@/repository/inventory.repository";
import type { Inventory } from "@/validation/inventory.validation";

export async function createInventory(data: Inventory) {
	const inventory = await inventoryRepository.insertInventory(data);

	return { success: true, inventory };
}

// This is a temporary function to find inventory by filter. It will be removed once the inventory filter is implemented.
export async function findAll() {
	const inventories = await inventoryRepository.findInventories();

	const dataTable = inventories.map((row) => ({
		...row,
	}));

	return { success: true, inventories, dataTable };
}
