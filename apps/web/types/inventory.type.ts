export type Inventory = {
	id: string;
	productName: string;
	/**
	 * package = size + unit (from product)
	 */
	package: string;
	unitPrice: number | null; // reference from product schema (nullable there)
	init: number;
	received: number;
	used: number;
	backLoad: number;
	note: string;
};
