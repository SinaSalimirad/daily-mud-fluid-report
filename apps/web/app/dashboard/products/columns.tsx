"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { EmptyValue } from "@/components/common/empty";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DataTableFeatures } from "@/lib/data-table-features";
import type { Product } from "@/types/product.type";

const columnHelper = createColumnHelper<DataTableFeatures, Product>();

export const columns = columnHelper.columns([
	columnHelper.display({
		id: "counter",
		header: () => <div className="text-center">#</div>,
		cell: ({ row }) => (
			<div className="text-center text-muted-foreground tabular-nums">
				{row.index + 1}
			</div>
		),
	}),
	columnHelper.accessor("name", {
		header: () => <div className="text-left">Name</div>,
		cell: ({ getValue }) => (
			<span className="font-medium text-left">{getValue()}</span>
		),
	}),
	columnHelper.accessor("quantity", {
		header: () => <div className="text-center tabular-nums">Quantity</div>,
		cell: ({ getValue }) => (
			<div className="text-center tabular-nums">{getValue()}</div>
		),
	}),
	columnHelper.accessor("height", {
		header: () => <div className="text-center tabular-nums">Height</div>,
		cell: ({ getValue }) => {
			const value = getValue();
			return value != null ? (
				<div className="text-center tabular-nums">{value}</div>
			) : (
				<EmptyValue />
			);
		},
	}),
	columnHelper.accessor("width", {
		header: () => <div className="text-center tabular-nums">Width</div>,
		cell: ({ getValue }) => {
			const value = getValue();
			return value != null ? (
				<div className="text-center tabular-nums">{value}</div>
			) : (
				<EmptyValue />
			);
		},
	}),

	columnHelper.accessor("unit", {
		header: () => <div className="text-center tabular-nums">Unit</div>,
		cell: ({ getValue }) => (
			<div className="text-center">
				<Badge variant="outline">{getValue()}</Badge>
			</div>
		),
	}),

	columnHelper.accessor("sg", {
		header: () => (
			<div className="text-center tabular-nums">Specific Gravity</div>
		),
		cell: ({ getValue }) => {
			const value = getValue();
			return value != null ? (
				<div className="text-center tabular-nums">{value}</div>
			) : (
				<EmptyValue />
			);
		},
	}),

	columnHelper.accessor("origin", {
		header: () => <div className="text-center tabular-nums">Origin</div>,
		cell: ({ getValue }) => (
			<div className="text-center tabular-nums">{getValue()}</div>
		),
	}),

	columnHelper.accessor("unitPrice", {
		header: () => <div className="text-center tabular-nums">Unit Price</div>,

		cell: ({ getValue }) => (
			<div className="text-center tabular-nums">{getValue()}</div>
		),
	}),

	columnHelper.display({
		id: "actions",
		header: () => <div className="text-center">Actions</div>,
		cell: ({ row }) => {
			const product = row.original;

			return (
				<div className="flex justify-center">
					<DropdownMenu>
						<DropdownMenuTrigger
							render={<Button variant="ghost" size="icon" className="size-8" />}
						>
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="size-4" />
						</DropdownMenuTrigger>

						<DropdownMenuContent align="end">
							<DropdownMenuGroup>
								<DropdownMenuLabel>Product actions</DropdownMenuLabel>

								<DropdownMenuItem
									onClick={() => navigator.clipboard.writeText(product.id)}
								>
									Copy product ID
								</DropdownMenuItem>

								<DropdownMenuSeparator />

								<DropdownMenuItem>View product</DropdownMenuItem>
								<DropdownMenuItem>Edit product</DropdownMenuItem>

								<DropdownMenuItem variant="destructive">
									Delete product
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	}),
]);
