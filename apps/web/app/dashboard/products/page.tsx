"use client";

import { useGetAllProducts } from "@/hooks/use-product-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function ProductPage() {
	const { isFetching, error, data: products = [] } = useGetAllProducts();

	return <DataTable columns={columns} data={products} />;
}
