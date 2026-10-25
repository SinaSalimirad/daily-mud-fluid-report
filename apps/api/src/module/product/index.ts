import { Elysia } from "elysia";
import { ProductModel } from "./model";
import {
	createProduct,
	findByFilter,
	removeProduct,
	updateProduct,
} from "./service";

export const productController = new Elysia({ prefix: "/v1/products" })
	.get(
		"/",
		async ({ query }) => {
			return await findByFilter(query);
		},
		{
			query: ProductModel.filter,
		},
	)
	.post(
		"/",
		async ({ body }) => {
			return await createProduct(body);
		},
		{
			body: ProductModel.create,
		},
	)

	.patch(
		"/:id",
		async ({ params, body }) => {
			return await updateProduct(params.id, body);
		},
		{
			body: ProductModel.update,
		},
	)
	.delete("/:id", async ({ params }) => {
		return await removeProduct(params.id);
	});
