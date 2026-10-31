import type { GetProductsResponse, Product } from "@/types/product.type";
import api from "./api";

export async function getAllProducts(): Promise<Product[]> {
	const { data } = await api.get<GetProductsResponse>("/v1/products");

	return data.products;
}

export async function getSearchProducts<
	T extends Record<string, string | number>,
>(params: T): Promise<Product[]> {
	const { data } = await api.get<GetProductsResponse>("/v1/products", {
		params,
	});

	return data.products;
}
