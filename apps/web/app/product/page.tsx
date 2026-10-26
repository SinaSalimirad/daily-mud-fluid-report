"use client";

import {
	type ColumnFiltersState,
	type ColumnVisibilityState,
	columnFilteringFeature,
	columnVisibilityFeature,
	createColumnHelper,
	createFilteredRowModel,
	createPaginatedRowModel,
	createSortedRowModel,
	FlexRender,
	rowPaginationFeature,
	rowSelectionFeature,
	rowSortingFeature,
	tableFeatures,
	useTable,
} from "@tanstack/react-table";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function Product() {
	return <DataTable data={[]} />;
}

const features = tableFeatures({
	columnFilteringFeature,
	columnVisibilityFeature,
	rowPaginationFeature,
	rowSelectionFeature,
	rowSortingFeature,
	filteredRowModel: createFilteredRowModel(),
	paginatedRowModel: createPaginatedRowModel(),
	sortedRowModel: createSortedRowModel(),
});

type Columns = {
	id: string;
	name: string;
	quantity: number;
	width: number;
	height: number;
	unit: string;
	sg: number;
	origin: string;
	unitPrice: number;
	createdAt: Date;
	updatedAt: Date;
};

const columnHelper = createColumnHelper<typeof features, Columns>();

const columns = columnHelper.columns([
	columnHelper.display({
		id: "select",
		header: ({ table }) => (
			<div className="flex items-center justify-center">
				<Checkbox
					checked={table.getIsAllPageRowsSelected()}
					indeterminate={
						table.getIsSomePageRowsSelected() &&
						!table.getIsAllPageRowsSelected()
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			</div>
		),
		cell: ({ row }) => (
			<div className="flex items-center justify-center">
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	}),
	columnHelper.accessor("name", {
		header: "Name",
		cell: ({ row }) => {
			row.original.name;
		},
		enableHiding: false,
	}),
	columnHelper.accessor("quantity", {
		header: "Quantity",
		cell: ({ row }) => {
			row.original.quantity;
		},
		enableHiding: false,
	}),
	columnHelper.accessor("height", {
		header: "Height",
		cell: ({ row }) => {
			row.original.height;
		},
	}),
	columnHelper.accessor("width", {
		header: "Width",
		cell: ({ row }) => {
			row.original.width;
		},
	}),
	columnHelper.accessor("unit", {
		header: "Unit",
		cell: ({ row }) => {
			row.original.unit;
		},
	}),
	columnHelper.accessor("sg", {
		header: "Specific Gravity",
		cell: ({ row }) => {
			row.original.sg;
		},
	}),
	columnHelper.accessor("origin", {
		header: "Origin",
		cell: ({ row }) => {
			row.original.origin;
		},
	}),
	columnHelper.accessor("unitPrice", {
		header: "Unit Price",
		cell: ({ row }) => {
			row.original.sg;
		},
	}),
	columnHelper.accessor("createdAt", {
		header: "Created",
		cell: ({ row }) => {
			row.original.createdAt;
		},
	}),
	columnHelper.accessor("updatedAt", {
		header: "Updated",
		cell: ({ row }) => {
			row.original.updatedAt;
		},
	}),
]);

export function DataTable({ data: initialData }: { data: Columns[] }) {
	const [data, _setData] = useState(() => initialData);
	const [columnVisibility, setColumnVisibility] =
		useState<ColumnVisibilityState>({});
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});

	const table = useTable({
		features,
		data,
		columns,
		state: {
			columnVisibility,
			columnFilters,
			pagination,
		},
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onPaginationChange: setPagination,
	});

	return (
		<>
			<div className="overflow-hidden rounded-lg border">
				<Table>
					<TableHeader className="sticky top-0 z-10 bg-muted">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} colSpan={header.colSpan}>
											{header.isPlaceholder ? null : (
												<FlexRender header={header} />
											)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody className="**:data-[slot=table-cell]:first:w-8">
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.original.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											<FlexRender cell={cell} />
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-between px-4">
				<div className="flex w-full items-center gap-8 lg:w-fit">
					<div className="hidden items-center gap-2 lg:flex">
						<Label htmlFor="rows-per-page" className="text-sm font-medium">
							Rows per page
						</Label>
						<Select
							value={`${table.state.pagination.pageSize}`}
							onValueChange={(value) => {
								table.setPageSize(Number(value));
							}}
							items={[10, 20, 30, 40, 50].map((pageSize) => ({
								label: `${pageSize}`,
								value: `${pageSize}`,
							}))}
						>
							<SelectTrigger size="sm" className="w-20" id="rows-per-page">
								<SelectValue placeholder={table.state.pagination.pageSize} />
							</SelectTrigger>
							<SelectContent side="top">
								<SelectGroup>
									{[10, 20, 30, 40, 50].map((pageSize) => (
										<SelectItem key={pageSize} value={`${pageSize}`}>
											{pageSize}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className="flex w-fit items-center justify-center text-sm font-medium">
						Page {table.state.pagination.pageIndex + 1} of{" "}
						{table.getPageCount()}
					</div>
					<div className="ml-auto flex items-center gap-2 lg:ml-0">
						<Button
							variant="outline"
							className="hidden h-8 w-8 p-0 lg:flex"
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}
						>
							<span className="sr-only">Go to first page</span>
							<ChevronsLeftIcon />
						</Button>
						<Button
							variant="outline"
							className="size-8"
							size="icon"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							<span className="sr-only">Go to previous page</span>
							<ChevronLeftIcon />
						</Button>
						<Button
							variant="outline"
							className="size-8"
							size="icon"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							<span className="sr-only">Go to next page</span>
							<ChevronRightIcon />
						</Button>
						<Button
							variant="outline"
							className="hidden size-8 lg:flex"
							size="icon"
							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
							disabled={!table.getCanNextPage()}
						>
							<span className="sr-only">Go to last page</span>
							<ChevronsRightIcon />
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
