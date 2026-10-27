export type ProductOrigin = "local" | "foreign";

export type Product = {
	id: string;
	name: string;
	quantity: number;
	width?: number;
	height?: number;
	unit: string;
	sg?: number;
	origin: ProductOrigin;
	unitPrice: number;
	createdAt: Date;
	updatedAt: Date;
};
