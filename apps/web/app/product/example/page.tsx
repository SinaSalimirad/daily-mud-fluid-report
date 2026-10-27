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
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpDownIcon,
  Columns3Icon,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toPersianDate } from "@/lib/date";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type Origin = 

type Product = {
  id: string;
  name: string;
  quantity: number;
  width: number;
  height: number;
  unit: string;
  sg: number;
  origin: Origin;
  unitPrice: number;
  createdAt: Date;
  updatedAt: Date;
};

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */

const PAGE_SIZES = [10, 20, 30, 40, 50] as const;

// TODO: replace with the real currency of your price field.
const CURRENCY = "USD";

const ORIGIN_LABELS: Record<Origin, string> = {
  local: "Local",
  foreign: "Foreign",
};

const ORIGIN_FILTER_ITEMS = [
  { label: "All origins", value: "all" },
  { label: ORIGIN_LABELS.local, value: "local" },
  { label: ORIGIN_LABELS.foreign, value: "foreign" },
];

// Used by the "Columns" menu (headers are components, so we need plain labels).
const COLUMN_LABELS: Record<string, string> = {
  name: "Name",
  quantity: "Quantity",
  width: "Width",
  height: "Height",
  unit: "Unit",
  sg: "Specific gravity",
  origin: "Origin",
  unitPrice: "Unit price",
  createdAt: "Created",
  updatedAt: "Last modified",
};

const integerFormatter = new Intl.NumberFormat("en-US");
const decimalFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: CURRENCY,
});

/* -------------------------------------------------------------------------- */
/*                                  Dummy data                                */
/* -------------------------------------------------------------------------- */

const dummyProducts: Product[] = [
  {
    id: "019a1000-0000-7000-8000-000000000001",
    name: "Barite",
    quantity: 25000,
    width: 1,
    height: 1,
    unit: "kg",
    sg: 4.2,
    origin: "foreign",
    unitPrice: 0.35,
    createdAt: new Date("2026-10-01T08:30:00Z"),
    updatedAt: new Date("2026-10-20T10:15:00Z"),
  },
  {
    id: "019a1000-0000-7000-8000-000000000002",
    name: "Bentonite",
    quantity: 12000,
    width: 1,
    height: 1,
    unit: "kg",
    sg: 2.6,
    origin: "local",
    unitPrice: 0.22,
    createdAt: new Date("2026-10-02T09:00:00Z"),
    updatedAt: new Date("2026-10-21T11:20:00Z"),
  },
  {
    id: "019a1000-0000-7000-8000-000000000003",
    name: "Xanthan Gum",
    quantity: 500,
    width: 0.4,
    height: 0.6,
    unit: "kg",
    sg: 1.5,
    origin: "foreign",
    unitPrice: 8.5,
    createdAt: new Date("2026-10-03T07:45:00Z"),
    updatedAt: new Date("2026-10-22T13:10:00Z"),
  },
  {
    id: "019a1000-0000-7000-8000-000000000004",
    name: "PAC-LV",
    quantity: 1800,
    width: 0.5,
    height: 0.7,
    unit: "kg",
    sg: 1.6,
    origin: "foreign",
    unitPrice: 3.2,
    createdAt: new Date("2026-10-04T10:00:00Z"),
    updatedAt: new Date("2026-10-19T08:45:00Z"),
  },
  {
    id: "019a1000-0000-7000-8000-000000000005",
    name: "Soda Ash",
    quantity: 2000,
    width: 0.4,
    height: 0.6,
    unit: "kg",
    sg: 2.5,
    origin: "local",
    unitPrice: 0.75,
    createdAt: new Date("2026-10-05T08:15:00Z"),
    updatedAt: new Date("2026-10-18T14:30:00Z"),
  },
  {
    id: "019a1000-0000-7000-8000-000000000006",
    name: "Caustic Soda",
    quantity: 750,
    width: 0.3,
    height: 0.5,
    unit: "kg",
    sg: 2.13,
    origin: "foreign",
    unitPrice: 1.1,
    createdAt: new Date("2026-10-06T09:20:00Z"),
    updatedAt: new Date("2026-10-20T12:00:00Z"),
  },
  {
    id: "019a1000-0000-7000-8000-000000000007",
    name: "PAC-HV",
    quantity: 2200,
    width: 0.5,
    height: 0.7,
    unit: "kg",
    sg: 1.5,
    origin: "foreign",
    unitPrice: 4.1,
    createdAt: new Date("2026-10-07T07:30:00Z"),
    updatedAt: new Date("2026-10-23T09:40:00Z"),
  },
  {
    id: "019a1000-0000-7000-8000-000000000008",
    name: "Sodium Chloride",
    quantity: 5000,
    width: 1,
    height: 1,
    unit: "kg",
    sg: 2.16,
    origin: "local",
    unitPrice: 0.18,
    createdAt: new Date("2026-10-08T11:00:00Z"),
    updatedAt: new Date("2026-10-24T10:00:00Z"),
  },
  {
    id: "019a1000-0000-7000-8000-000000000009",
    name: "CMC",
    quantity: 900,
    width: 0.4,
    height: 0.6,
    unit: "kg",
    sg: 1.5,
    origin: "foreign",
    unitPrice: 2.8,
    createdAt: new Date("2026-10-09T08:00:00Z"),
    updatedAt: new Date("2026-10-22T15:30:00Z"),
  },
  {
    id: "019a1000-0000-7000-8000-000000000010",
    name: "Potassium Chloride",
    quantity: 3500,
    width: 1,
    height: 1,
    unit: "kg",
    sg: 1.98,
    origin: "foreign",
    unitPrice: 0.65,
    createdAt: new Date("2026-10-10T09:30:00Z"),
    updatedAt: new Date("2026-10-25T08:20:00Z"),
  },
  {
    id: "019a1000-0000-7000-8000-000000000011",
    name: "Drilling Starch",
    quantity: 1500,
    width: 0.5,
    height: 0.7,
    unit: "kg",
    sg: 1.5,
    origin: "local",
    unitPrice: 1.4,
    createdAt: new Date("2026-10-11T10:15:00Z"),
    updatedAt: new Date("2026-10-24T11:45:00Z"),
  },
  {
    id: "019a1000-0000-7000-8000-000000000012",
    name: "Calcium Carbonate",
    quantity: 8000,
    width: 1,
    height: 1,
    unit: "kg",
    sg: 2.7,
    origin: "local",
    unitPrice: 0.3,
    createdAt: new Date("2026-10-12T07:50:00Z"),
    updatedAt: new Date("2026-10-25T14:10:00Z"),
  },
];

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export default function ProductsPage() {
  return <DataTable data={dummyProducts} />;
}

/* -------------------------------------------------------------------------- */
/*                               Table definition                             */
/* -------------------------------------------------------------------------- */

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

const columnHelper = createColumnHelper<typeof features, Product>();

type SortDirection = false | "asc" | "desc";

function toAriaSort(sorted: SortDirection) {
  if (sorted === "asc") return "ascending";
  if (sorted === "desc") return "descending";
  return "none";
}

function SortableHeader({
  label,
  sorted,
  onToggle,
  align = "start",
}: {
  label: string;
  sorted: SortDirection;
  onToggle: () => void;
  align?: "start" | "end";
}) {
  const Icon =
    sorted === "asc"
      ? ArrowUpIcon
      : sorted === "desc"
        ? ArrowDownIcon
        : ChevronsUpDownIcon;

  return (
    <div className={cn("flex", align === "end" && "justify-end")}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className={cn(
          "h-8 gap-1.5 px-2 font-medium",
          align === "end" ? "-me-2" : "-ms-2",
        )}
      >
        {label}
        <Icon
          aria-hidden="true"
          className={cn("size-3.5", !sorted && "text-muted-foreground")}
        />
      </Button>
    </div>
  );
}

function DateCell({ value }: { value: Date }) {
  return (
    <time
      dateTime={value.toISOString()}
      className="whitespace-nowrap text-muted-foreground tabular-nums"
    >
      {toPersianDate(value)}
    </time>
  );
}

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
          aria-label="Select all rows on this page"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={`Select ${row.original.name}`}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <SortableHeader
        label="Name"
        sorted={column.getIsSorted()}
        onToggle={() => column.toggleSorting()}
      />
    ),
    cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
    // Case-insensitive "contains" match, driven by the toolbar search box.
    filterFn: (row, columnId, filterValue: string) =>
      String(row.getValue(columnId))
        .toLowerCase()
        .includes(String(filterValue).trim().toLowerCase()),
    enableHiding: false,
  }),
  columnHelper.accessor("quantity", {
    header: ({ column }) => (
      <SortableHeader
        label="Quantity"
        align="end"
        sorted={column.getIsSorted()}
        onToggle={() => column.toggleSorting()}
      />
    ),
    cell: ({ getValue }) => (
      <div className="text-end font-medium tabular-nums">
        {integerFormatter.format(getValue())}
      </div>
    ),
    enableHiding: false,
  }),
  columnHelper.accessor("unit", {
    header: ({ column }) => (
      <SortableHeader
        label="Unit"
        sorted={column.getIsSorted()}
        onToggle={() => column.toggleSorting()}
      />
    ),
    cell: ({ getValue }) => <Badge variant="secondary">{getValue()}</Badge>,
  }),
  columnHelper.accessor("width", {
    header: ({ column }) => (
      <SortableHeader
        label="Width"
        align="end"
        sorted={column.getIsSorted()}
        onToggle={() => column.toggleSorting()}
      />
    ),
    cell: ({ getValue }) => (
      <div className="text-end tabular-nums">
        {decimalFormatter.format(getValue())}
      </div>
    ),
  }),
  columnHelper.accessor("height", {
    header: ({ column }) => (
      <SortableHeader
        label="Height"
        align="end"
        sorted={column.getIsSorted()}
        onToggle={() => column.toggleSorting()}
      />
    ),
    cell: ({ getValue }) => (
      <div className="text-end tabular-nums">
        {decimalFormatter.format(getValue())}
      </div>
    ),
  }),
  columnHelper.accessor("sg", {
    header: ({ column }) => (
      <SortableHeader
        label="Specific gravity"
        align="end"
        sorted={column.getIsSorted()}
        onToggle={() => column.toggleSorting()}
      />
    ),
    cell: ({ getValue }) => (
      <div className="text-end tabular-nums">
        {decimalFormatter.format(getValue())}
      </div>
    ),
  }),
  columnHelper.accessor("origin", {
    header: ({ column }) => (
      <SortableHeader
        label="Origin"
        sorted={column.getIsSorted()}
        onToggle={() => column.toggleSorting()}
      />
    ),
    cell: ({ getValue }) => {
      const origin = getValue();
      return (
        <Badge variant={origin === "local" ? "secondary" : "outline"}>
          {ORIGIN_LABELS[origin]}
        </Badge>
      );
    },
    // Exact match, driven by the toolbar origin select.
    filterFn: (row, columnId, filterValue: string) =>
      row.getValue(columnId) === filterValue,
  }),
  columnHelper.accessor("unitPrice", {
    header: ({ column }) => (
      <SortableHeader
        label="Unit price"
        align="end"
        sorted={column.getIsSorted()}
        onToggle={() => column.toggleSorting()}
      />
    ),
    cell: ({ getValue }) => (
      <div className="text-end tabular-nums">
        {currencyFormatter.format(getValue())}
      </div>
    ),
  }),
  columnHelper.accessor("createdAt", {
    header: ({ column }) => (
      <SortableHeader
        label="Created"
        sorted={column.getIsSorted()}
        onToggle={() => column.toggleSorting()}
      />
    ),
    cell: ({ getValue }) => <DateCell value={getValue()} />,
  }),
  columnHelper.accessor("updatedAt", {
    header: ({ column }) => (
      <SortableHeader
        label="Last modified"
        sorted={column.getIsSorted()}
        onToggle={() => column.toggleSorting()}
      />
    ),
    cell: ({ getValue }) => <DateCell value={getValue()} />,
  }),
]);

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export function DataTable({ data }: { data: Product[] }) {
  const [columnVisibility, setColumnVisibility] =
    useState<ColumnVisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZES[0] as number,
  });

  const table = useTable({
    features,
    data,
    columns,
    // Stable ids keep row selection correct across sorting/filtering/paging.
    getRowId: (row) => row.id,
    state: {
      columnVisibility,
      columnFilters,
      pagination,
    },
    onColumnFiltersChange: (updater) => {
      setColumnFilters(updater);
      // A new filter can shrink the result set; always go back to page 1.
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    },
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
  });

  const nameFilter =
    (columnFilters.find((f) => f.id === "name")?.value as string) ?? "";
  const originFilter =
    (columnFilters.find((f) => f.id === "origin")?.value as string) ?? "all";
  const hasActiveFilters = columnFilters.length > 0;

  const filteredCount = table.getFilteredRowModel().rows.length;
  const selectedCount = Object.keys(table.state.rowSelection ?? {}).length;
  const pageCount = Math.max(1, table.getPageCount());

  const clearFilters = () => setColumnFilters([]);

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <SearchIcon
            aria-hidden="true"
            className="pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            value={nameFilter}
            onChange={(event) =>
              table
                .getColumn("name")
                ?.setFilterValue(event.target.value || undefined)
            }
            placeholder="Search by name"
            aria-label="Search products by name"
            className="ps-8"
          />
        </div>

        <Select
          value={originFilter}
          onValueChange={(value) =>
            table
              .getColumn("origin")
              ?.setFilterValue(!value || value === "all" ? undefined : value)
          }
          items={ORIGIN_FILTER_ITEMS}
        >
          <SelectTrigger
            className="w-full sm:w-40"
            aria-label="Filter by origin"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {ORIGIN_FILTER_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button type="button" variant="ghost" onClick={clearFilters}>
            Clear filters
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="outline"
                className="w-full sm:ms-auto sm:w-auto"
              />
            }
          >
            <Columns3Icon aria-hidden="true" />
            Columns
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                    closeOnClick={false}
                  >
                    {COLUMN_LABELS[column.id] ?? column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableCaption className="sr-only">
            Products inventory. Use the column headers to sort.
          </TableCaption>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    aria-sort={
                      header.column.getCanSort()
                        ? toAriaSort(header.column.getIsSorted())
                        : undefined
                    }
                    className={cn(header.column.id === "select" && "w-10")}
                  >
                    {header.isPlaceholder ? null : (
                      <FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
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
                  colSpan={table.getVisibleLeafColumns().length}
                  className="h-32 text-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                      {hasActiveFilters
                        ? "No products match your filters."
                        : "No products yet."}
                    </p>
                    {hasActiveFilters && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={clearFilters}
                      >
                        Clear filters
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          className="text-sm text-muted-foreground tabular-nums"
          aria-live="polite"
        >
          {selectedCount} of {filteredCount} row(s) selected
        </p>

        <div className="flex items-center justify-between gap-6 sm:justify-end lg:gap-8">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.state.pagination.pageSize}`}
              onValueChange={(value) => {
                if (value) table.setPageSize(Number(value));
              }}
              items={PAGE_SIZES.map((pageSize) => ({
                label: `${pageSize}`,
                value: `${pageSize}`,
              }))}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectGroup>
                  {PAGE_SIZES.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center text-sm font-medium tabular-nums">
            Page {table.state.pagination.pageIndex + 1} of {pageCount}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeftIcon aria-hidden="true" className="rtl:rotate-180" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon aria-hidden="true" className="rtl:rotate-180" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon aria-hidden="true" className="rtl:rotate-180" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => table.setPageIndex(pageCount - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRightIcon
                aria-hidden="true"
                className="rtl:rotate-180"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
