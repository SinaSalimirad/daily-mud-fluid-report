"use client";

import { ArrowRightFromLine, SquareChartGantt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetAllProducts } from "@/hooks/use-product-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function ProductPage() {
	const {
		isFetching: _isFetching,
		error: _error,
		data: products = [],
	} = useGetAllProducts();

	return (
		<section className="space-y-4">
			<header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="space-y-1">
					<h2 className="text-lg font-semibold tracking-tight">Products</h2>

					<p className="text-xs text-muted-foreground">
						Manage and track drilling fluid products, their specifications and
						pricing.
					</p>
				</div>

				<div className="flex items-center gap-2">
					<Button size="lg" className="h-10 p-4">
						<SquareChartGantt className="size-4" />
						Add Product
					</Button>

					<Button size="lg" className="h-10 p-4" variant="outline">
						<ArrowRightFromLine className="size-4 -rotate-90" />
						Export
					</Button>
				</div>
			</header>

			<DataTable columns={columns} data={products} />
		</section>
	);
}
