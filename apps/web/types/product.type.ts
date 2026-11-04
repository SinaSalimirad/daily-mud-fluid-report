export type ProductOrigin = "local" | "foreign";

export type Product = {
	id: string;
	name: string;
	size: number;
	width: number | null;
	height: number | null;
	unit: string;
	sg: number | null;
	origin: ProductOrigin;
	unitPrice: number | null;
	createdAt: Date;
	updatedAt: Date;
};

export type GetProductsResponse = {
	success: boolean;
	products: Product[];
};
