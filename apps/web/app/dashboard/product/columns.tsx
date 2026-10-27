"use client";

export type Product = {
  id: string;
  name: string;
  quantity: number;
  width?: number;
  height?: number;
  unit: string;
  sg?: number;
  origin: "local" | "foreign";
  unitPrice: number;
  createdAt: Date;
  updatedAt: Date;
};

import { createColumnHelper } from "@tanstack/react-table";
import type { DataTableFeatures } from "./data-table-features";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const columnHelper = createColumnHelper<DataTableFeatures, Product>();

export const columns = columnHelper.columns([
  columnHelper.display({
    header: "#",
    id: "counter",
    cell: ({ row }) => {
      return <span className="font-bold">{row.index + 1}</span>;
    },
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("quantity", {
    header: "Quantity",
  }),
  columnHelper.accessor("height", {
    header: "Height",
    cell: ({ getValue }) => {
      return getValue() ? (
        <p className="text-center">{getValue()}</p>
      ) : (
        <Badge variant="destructive">U/N</Badge>
      );
    },
  }),
  columnHelper.accessor("width", {
    header: "Width",
    cell: ({ getValue }) => {
      return getValue() ? (
        <p className="text-center">{getValue()}</p>
      ) : (
        <Badge variant="destructive">U/N</Badge>
      );
    },
  }),
  columnHelper.accessor("unit", {
    header: "Unit",
    cell: ({ getValue }) => {
      return <Badge variant="outline">{getValue()}</Badge>;
    },
  }),

  columnHelper.accessor("sg", {
    header: "Specific Gravity",
  }),
  columnHelper.accessor("origin", {
    header: "Origin",
  }),
  columnHelper.accessor("unitPrice", {
    header: "Unit Price",
    cell: ({ getValue }) => {
      return <p>${getValue()}</p>;
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" className="h-8 w-8 p-0" />}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
]);
