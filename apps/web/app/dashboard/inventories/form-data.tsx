import { useState } from "react";
import {
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchProducts } from "@/hooks/use-product-query";
import type { Product } from "@/types/product.type";
import { ComboboxCustom } from "./combobox-data";

export function FromData() {
	const [search, setSearch] = useState("");
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	const debouncedSearch = useDebounce(search);

	const {
		data: products = [],
		isLoading,
		error,
		status,
	} = useSearchProducts(debouncedSearch);

	console.log({ status, error, count: products.length, products });

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
						<ComboboxCustom
							items={products}
							value={selectedProduct}
							onValueChange={setSelectedProduct}
							onSearchChange={setSearch}
							isLoading={isLoading}
							placeholder="Search products (e.g. Barite, Starch LV)"
						/>
						{selectedProduct && (
							<div className="text-sm text-muted-foreground">
								Selected: {selectedProduct.name}
							</div>
						)}
					</FieldGroup>
				</FieldSet>
			</FieldGroup>
		</form>
	);
}
