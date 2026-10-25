import * as productRepository from "@/repository/product.repository";
import type { Product } from "@/validation/product.validation";

export async function createProduct(data: Product) {
	const product = await productRepository.insertProduct(data);

	return { success: true, product };
}

export async function findByFilter(filter = {}) {
	const products = await productRepository.findByFilterProducts(filter);

	return { success: true, products };
}

export async function updateProduct(id: string, data: Partial<Product>) {
	const product = await productRepository.updateProduct(id, data);

	if (!product) {
		return { success: false, message: "Product not found" };
	}

	return { success: true, product };
}

export async function removeProduct(id: string) {
	const product = await productRepository.removeProduct(id);

	if (!product) {
		return { success: false, message: "Product not found" };
	}

	return { success: true, product };
}
