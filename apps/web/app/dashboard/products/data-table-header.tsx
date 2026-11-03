import type { ReactTable, RowData } from "@tanstack/react-table";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DataTableFeatures } from "@/lib/data-table-features";

export function DataTableHeader<TData extends RowData>({
	table,
}: {
	table: ReactTable<DataTableFeatures, TData>;
}) {
	return (
		<section className="flex items-center justify-between gap-2">
			<Input
				value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
				onChange={(e) => {
					table.getColumn("name")?.setFilterValue(e.target.value || undefined);
					table.setPageIndex(0);
				}}
			/>

			<div>
				<Button className="h-8 p-4">
					<SlidersHorizontal />
					<span>Filter</span>
				</Button>
				<Button className="h-8 p-4">
					<span>Sort by Name</span>
					<span>(A{"->"}Z)</span>
					<ChevronDown />
				</Button>
			</div>
		</section>
	);
}
