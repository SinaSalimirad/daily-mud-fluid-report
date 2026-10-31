"use client";

import { useState } from "react";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchProducts } from "@/hooks/use-product-query";
import type { Product } from "@/types/product.type";
import { ComboboxCustom } from "./combobox-data";

export function FromData() {
	const [search, setSearch] = useState("");
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	const debouncedSearch = useDebounce(search);

	const { data: products = [], isLoading } = useSearchProducts(debouncedSearch);

	return (
		<form>
			<FieldGroup>
				<FieldSet>
					<FieldLegend>Information</FieldLegend>
					<FieldDescription>
						Select a product and review its information.
					</FieldDescription>
					<FieldGroup>
						<FieldLabel>Product Name</FieldLabel>

						<Field>
							<ComboboxCustom
								items={products}
								value={selectedProduct}
								onValueChange={setSelectedProduct}
								onSearchChange={setSearch}
								isLoading={isLoading}
								placeholder="Search products (e.g. Barite, Starch LV)"
							/>
						</Field>

						<Field className="grid grid-cols-2 gap-4">
							<Field>
								<FieldLabel htmlFor="package">Package</FieldLabel>
								<Input id="package" type="text" className="h-10" disabled />
							</Field>
							<Field>
								<FieldLabel htmlFor="unit-price">Unit Price</FieldLabel>
								<Input id="unit-price" type="text" className="h-10" disabled />
							</Field>
						</Field>
					</FieldGroup>
				</FieldSet>
				<FieldSeparator />

				<FieldSet>
					<FieldLegend>Management</FieldLegend>
					<FieldDescription>add a description here</FieldDescription>
					<FieldGroup>
						<Field className="grid grid-cols-3 gap-4">
							<Field>
								<FieldLabel htmlFor="package">Initial Stock</FieldLabel>
								<Input id="package" type="text" className="h-10" />
							</Field>

							<Field>
								<FieldLabel htmlFor="unit-price">Daily Used</FieldLabel>
								<Input id="unit-price" type="text" className="h-10" />
							</Field>

							<Field>
								<FieldLabel htmlFor="unit-price">Daily Received</FieldLabel>
								<Input id="unit-price" type="text" className="h-10" />
							</Field>
						</Field>
						<Textarea placeholder="Add details if you need " />
					</FieldGroup>
				</FieldSet>
			</FieldGroup>
		</form>
	);
}
