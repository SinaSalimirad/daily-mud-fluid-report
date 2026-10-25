import Elysia from "elysia";
import { InventoryModel } from "./model";
import { createInventory, findAll } from "./service";

export const inventoryController = new Elysia({
	prefix: "/v1/inventories",
})
	.get("/", async () => {
		return await findAll();
	})
	.post(
		"/",
		async ({ body }) => {
			return await createInventory(body);
		},
		{
			body: InventoryModel.create,
		},
	);
