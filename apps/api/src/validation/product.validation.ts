import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { ProductOrigin, ProductUnit } from "@/schema/enums.schema";
import { products } from "@/schema/product.schema";

export const productBaseSchema = createInsertSchema(products, {
	name: z.string().trim().min(1),
	quantity: z.number().positive(),
	width: z.number().positive().optional(),
	height: z.number().positive().optional(),
	unit: z.enum(ProductUnit),
	sg: z.number().positive().optional(),
	origin: z.enum(ProductOrigin),
	unitPrice: z.number().positive().optional(),
});

const checkProduct = (
	data: Partial<z.infer<typeof productBaseSchema>>,
	ctx: z.RefinementCtx,
) => {
	/**
	 * Width and height must either both be provided or both be omitted.
	 * This condition is true when width is provided and height is omitted.
	 */
	if (data.width != null && data.height == null) {
		ctx.addIssue({
			code: "custom",
			path: ["height"],
			message: "Height is required when width is provided",
		});
	}

	if (data.height != null && data.width == null) {
		ctx.addIssue({
			code: "custom",
			path: ["width"],
			message: "Width is required when height is provided",
		});
	}
};

export const productSchema = productBaseSchema.superRefine(checkProduct);
export const productFilterSchema = productBaseSchema.partial().pick({
	name: true,
	height: true,
	width: true,
	unit: true,
	origin: true,
	unitPrice: true,
	quantity: true,
	sg: true,
});
export const productUpdateSchema = productBaseSchema
	.partial()
	.superRefine(checkProduct);
export const productParamsSchema = productBaseSchema.pick({ name: true });

export type Product = z.infer<typeof productSchema>;
export type ProductFilter = z.infer<typeof productFilterSchema>;
export type ProductUpdate = z.infer<typeof productUpdateSchema>;
