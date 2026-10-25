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

	/**
	 * Tip: The `name` parameter is used to identify the product to be updated or removed. The name is unique for each product, so it can be used as an identifier in the URL path. The name parameter is extracted from the URL and passed to the corresponding service functions to perform the update or removal of the product.
	 */
	.patch(
		"/:name",
		async ({ params, body }) => {
			return await updateProduct(params.name, body);
		},
		{
			body: ProductModel.update,
		},
	)
	.delete("/:name", async ({ params }) => {
		return await removeProduct(params.name);
	});
