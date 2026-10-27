"use client";

import { useState } from "react";
import { dummyProducts } from "@/lib/dummy_data";
import type { Product } from "@/types/product";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function ProductPage() {
	const [data, _setData] = useState<Product[]>(() => dummyProducts);

	return <DataTable columns={columns} data={data} />;
}
