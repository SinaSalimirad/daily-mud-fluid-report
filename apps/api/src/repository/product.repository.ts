import { and, asc, eq, ilike, type SQL } from "drizzle-orm";
import { db } from "@/config/db.config";
import { containsPattern } from "@/helper/search-pattern";
import { products } from "@/schema/product.schema";
import type { Product, ProductFilter } from "@/validation/product.validation";

export async function insertProduct(data: Product) {
	const [product] = await db.insert(products).values(data).returning();

	return product;
}

export async function findManyProducts() {
	return await db.select().from(products).orderBy(asc(products.name));
}

export async function findByFilterProducts(filter: ProductFilter = {}) {
	const conditions: SQL[] = [];

	// Name: partial match, case-insensitive
	if (filter.name !== undefined) {
		conditions.push(ilike(products.name, containsPattern(filter.name)));
	}

	// Other columns: exact match
	if (filter.quantity !== undefined) {
		conditions.push(eq(products.quantity, filter.quantity));
	}

	if (filter.width !== undefined) {
		conditions.push(eq(products.width, filter.width));
	}

	if (filter.height !== undefined) {
		conditions.push(eq(products.height, filter.height));
	}

	if (filter.unit !== undefined) {
		conditions.push(eq(products.unit, filter.unit));
	}

	if (filter.sg !== undefined) {
		conditions.push(eq(products.sg, filter.sg));
	}

	if (filter.origin !== undefined) {
		conditions.push(eq(products.origin, filter.origin));
	}

	if (filter.unitPrice !== undefined) {
		conditions.push(eq(products.unitPrice, filter.unitPrice));
	}

	// and() with an empty list returns undefined, which means "no WHERE clause"
	return db
		.select()
		.from(products)
		.where(and(...conditions))
		.orderBy(asc(products.name));
}

export async function updateProduct(id: string, data: Partial<Product>) {
	const [product] = await db
		.update(products)
		.set(data)
		.where(eq(products.id, id))
		.returning();

	return product;
}

export async function removeProduct(id: string) {
	const [product] = await db
		.delete(products)
		.where(eq(products.id, id))
		.returning();

	return product;
}
