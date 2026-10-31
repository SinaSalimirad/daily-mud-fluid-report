export type Inventory = {
	id: string;
	productName: string;
	/**
	 * package = quantity + unit (from product)
	 * FIXME: convert `quantity` into `size`
	 */
	package: string;
	unitPrice: number; // reference from product schema
	init: number;
	received: number;
	used: number;
	backLoad: number;
	note: string;
};
