import type { ReactTable, RowData } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DataTableFeatures } from "./data-table-features";

export function DataTablePagination<TData extends RowData>({
	table,
	itemName,
}: {
	table: ReactTable<DataTableFeatures, TData>;
	itemName: string;
}) {
	return (
		<div className="flex items-center justify-between px-4">
			<div className="flex text-sm text-nowrap text-muted-foreground">
				{/*
					 ** TODO:
					 	Add many states 
						1. For Create new Product (Empty product list)
						2. For Error in fetching
						3. add pagination on getting products
					 */}
				{table.getFilteredRowModel().rows.length === 0
					? 0
					: table.state.pagination.pageIndex * table.state.pagination.pageSize +
						1}{" "}
				-{" "}
				{(table.state.pagination.pageIndex + 1) *
					table.state.pagination.pageSize}{" "}
				of {table.getFilteredRowModel().rows.length} {itemName}.
			</div>

			<div className="flex w-full items-center gap-8 lg:w-fit">
				<div className="ml-auto flex items-center gap-2 lg:ml-0">
					<Button
						variant="outline"
						className="size-8"
						size="icon"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to previous page</span>
						<ChevronLeft />
					</Button>
					<Button
						size="icon"
						className="flex w-fit items-center justify-center text-sm font-medium size-8"
					>
						{table.state.pagination.pageIndex + 1}
					</Button>
					<Button
						variant="outline"
						className="size-8"
						size="icon"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to next page</span>
						<ChevronRight />
					</Button>
				</div>
			</div>
		</div>
	);
}
