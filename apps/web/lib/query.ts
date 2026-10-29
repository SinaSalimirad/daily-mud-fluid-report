import type { GetProductsResponse, Product } from "@/types/product";
import api from "./api";

export async function getProducts(): Promise<Product[]> {
	const { data } = await api.get<GetProductsResponse>("/v1/products");

	return data.products;
}
