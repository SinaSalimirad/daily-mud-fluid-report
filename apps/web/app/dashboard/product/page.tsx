"use client";

import { useState } from "react";
import { DataTable } from "./data-table";
import { columns, type Product } from "./columns";
import { dummyProducts } from "@/lib/dummy_data";

export default function ProductPage() {
  const [data, _setData] = useState<Product[]>(() => dummyProducts);

  return <DataTable columns={columns} data={data} />;
}
