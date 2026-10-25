import {
	productFilterSchema,
	productParamsSchema,
	productSchema,
	productUpdateSchema,
} from "@/validation/product.validation";

export const ProductModel = {
	create: productSchema,
	filter: productFilterSchema,
	update: productUpdateSchema,
	params: productParamsSchema,
} as const;
