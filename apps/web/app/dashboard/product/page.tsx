"use client";

import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";
import type { Product } from "@/types/product";

import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getProducts(): Promise<Product[]> {
	const { data } = await api.get<Product[]>("/v1/products");

	return data;
}

export default function ProductPage() {
	const {
		data: products = [],
		isPending,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
	});

	if (isPending) {
		return (
			<div className="flex min-h-40 items-center justify-center">
				<p className="text-sm text-muted-foreground">Loading products...</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex flex-col items-center justify-center gap-3 py-10">
				<p className="text-sm text-destructive">
					{error instanceof Error ? error.message : "Failed to load products."}
				</p>

				<button
					type="button"
					onClick={() => refetch()}
					className="text-sm underline underline-offset-4"
				>
					Try again
				</button>
			</div>
		);
	}

	return <DataTable columns={columns} data={products} />;
}
