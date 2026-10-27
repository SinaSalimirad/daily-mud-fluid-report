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

function EmptyValue() {
  return (
    <div className="text-right text-muted-foreground">
      <span aria-hidden="true">—</span>
      <span className="sr-only">Not specified</span>
    </div>
  );
}

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "counter",
    header: "#",
    cell: ({ row }) => (
      <span className="text-muted-foreground tabular-nums">
        {row.index + 1}
      </span>
    ),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
  }),
  columnHelper.accessor("quantity", {
    header: () => <div className="text-right tabular-nums">Quantity</div>,
    cell: ({ getValue }) => (
      <div className="text-right tabular-nums">{getValue()}</div>
    ),
  }),
  columnHelper.accessor("height", {
    header: () => <div className="text-right tabular-nums">Height</div>,
    cell: ({ getValue }) => {
      const value = getValue();
      return value != null ? (
        <div className="text-right tabular-nums">{value}</div>
      ) : (
        <EmptyValue />
      );
    },
  }),
  columnHelper.accessor("width", {
    header: () => <div className="text-right tabular-nums">Width</div>,
    cell: ({ getValue }) => {
      const value = getValue();
      return value != null ? (
        <div className="text-right tabular-nums">{value}</div>
      ) : (
        <EmptyValue />
      );
    },
  }),

  columnHelper.accessor("unit", {
    header: "Unit",
    cell: ({ getValue }) => <Badge variant="outline">{getValue()}</Badge>,
  }),

  columnHelper.accessor("sg", {
    header: () => (
      <div className="text-right tabular-nums">Specific Gravity</div>
    ),
    cell: ({ getValue }) => {
      const value = getValue();
      return value != null ? (
        <div className="text-right tabular-nums">{value}</div>
      ) : (
        <EmptyValue />
      );
    },
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
