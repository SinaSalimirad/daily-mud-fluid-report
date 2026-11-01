"use client";

import { useGetAllProducts } from "@/hooks/use-product-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function ProductPage() {
	const {
		isFetching: _isFetching,
		error: _error,
		data: products = [],
	} = useGetAllProducts();

	return <DataTable columns={columns} data={products} />;
}
