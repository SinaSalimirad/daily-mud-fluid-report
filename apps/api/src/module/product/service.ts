import * as productRepository from "@/repository/product.repository";
import type { Product, ProductUpdate } from "@/validation/product.validation";

export async function createProduct(data: Product) {
	const product = await productRepository.insertProduct(data);

	return { success: true, product };
}

export async function findByFilter(filter = {}) {
	const products = await productRepository.findByFilterProducts(filter);

	return { success: true, products };
}

export async function updateProduct(id: string, data: ProductUpdate) {
	const existingProduct = await productRepository.findProductById(id);

	if (!existingProduct) {
		return { success: false, message: "Product not found" };
	}

	// Validate dimensions against the final state, not only the PATCH body.
	const mergedProduct = { ...existingProduct, ...data };
	const hasWidth = mergedProduct.width != null;
	const hasHeight = mergedProduct.height != null;

	if (hasWidth !== hasHeight) {
		return {
			success: false,
			message:
				"Width and height must either both be provided or both be omitted",
			errors: [
				{
					field: hasWidth ? "height" : "width",
					message: hasWidth
						? "Height is required when width is provided"
						: "Width is required when height is provided",
				},
			],
		};
	}

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
