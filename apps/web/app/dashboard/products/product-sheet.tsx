"use client";

import { ChevronLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export function ProductSheet() {
	return (
		<Sheet>
			<SheetTrigger render={<Button size="lg" className="h-10 px-4" />}>
				<Plus className="size-4" />
				Add Product
			</SheetTrigger>

			<SheetContent
				side="top"
				className="mx-auto flex h-[90vh] w-[95vw] max-w-350 flex-col rounded-b-xl"
			>
				<form
					id="product-form"
					className="flex min-h-0 flex-1 flex-col"
					onSubmit={(e) => {
						e.preventDefault();
						// TODO: Submit product
					}}
				>
					{/* Header */}
					<SheetHeader className="shrink-0 border-b pb-4">
						<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<div className="flex items-center gap-2">
								<SheetClose
									render={
										<Button size="icon" variant="ghost" className="size-8" />
									}
								>
									<ChevronLeft className="size-5" />
								</SheetClose>

								<SheetTitle className="text-lg">Add New Product</SheetTitle>
							</div>

							<div className="flex items-center gap-2">
								<SheetClose
									render={
										<Button className="h-10 px-4" variant="outline" size="lg" />
									}
								>
									Discard
								</SheetClose>

								<Button className="h-10 px-4" size="lg" type="submit">
									Add Product
								</Button>
							</div>
						</div>
					</SheetHeader>

					{/* Form Content */}
					<div className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-8">
						<FieldGroup className="max-w-4xl space-y-8">
							{/* General Information */}
							<FieldSet>
								<FieldLegend>General Information</FieldLegend>

								<FieldGroup className="grid gap-5 sm:grid-cols-2">
									<Field className="sm:col-span-2">
										<FieldLabel htmlFor="name">Product Name</FieldLabel>
										<Input
											id="name"
											name="name"
											placeholder="e.g. Barite"
											autoComplete="off"
											className="h-10"
											required
										/>
									</Field>

									<Field>
										<FieldLabel htmlFor="size">Size</FieldLabel>
										<Input
											id="size"
											name="size"
											placeholder="e.g. 200 Mesh"
											className="h-10"
										/>
									</Field>

									<Field>
										<FieldLabel htmlFor="origin">Origin</FieldLabel>
										<Select
											name="origin"
											items={[
												{ label: "Local", value: "local" },
												{ label: "Foreign", value: "foreign" },
											]}
										>
											<SelectTrigger className="h-10 w-full">
												<SelectValue placeholder="Select origin" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value="local">Local</SelectItem>
													<SelectItem value="foreign">Foreign</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</Field>
								</FieldGroup>
							</FieldSet>

							{/* Technical Specifications */}
							<FieldSet>
								<FieldLegend>Technical Specifications</FieldLegend>

								<FieldGroup className="grid gap-5 sm:grid-cols-2">
									<Field>
										<FieldLabel htmlFor="unit">Unit</FieldLabel>
										<Input
											id="unit"
											name="unit"
											placeholder="e.g. kg"
											className="h-10"
										/>
									</Field>

									<Field>
										<FieldLabel htmlFor="sg">Specific Gravity (SG)</FieldLabel>
										<Input
											id="sg"
											name="sg"
											type="number"
											step="0.01"
											placeholder="e.g. 4.20"
											className="h-10"
										/>
									</Field>

									<Field>
										<FieldLabel htmlFor="height">Height</FieldLabel>
										<Input
											id="height"
											name="height"
											type="number"
											step="any"
											className="h-10"
										/>
									</Field>

									<Field>
										<FieldLabel htmlFor="width">Width</FieldLabel>
										<Input
											id="width"
											name="width"
											type="number"
											step="any"
											className="h-10"
										/>
									</Field>
								</FieldGroup>
							</FieldSet>

							{/* Pricing Information */}
							<FieldSet>
								<FieldLegend>Pricing Information</FieldLegend>

								<FieldGroup className="grid gap-5 sm:grid-cols-2">
									<Field>
										<FieldLabel htmlFor="unitPrice">Unit Price</FieldLabel>
										<Input
											id="unitPrice"
											name="unitPrice"
											type="number"
											min="0"
											step="any"
											placeholder="0.00"
											className="h-10"
										/>
									</Field>

									<Field>
										<FieldLabel htmlFor="currency">Currency</FieldLabel>
										<Select
											name="currency"
											items={[
												{ label: "USD ($)", value: "USD" },
												{ label: "EUR (€)", value: "EUR" },
												{ label: "GBP (£)", value: "GBP" },
												{ label: "IRR (﷼)", value: "IRR" },
											]}
										>
											<SelectTrigger className="h-10 w-full">
												<SelectValue placeholder="Select currency" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value="USD">USD ($)</SelectItem>
													<SelectItem value="EUR">EUR (€)</SelectItem>
													<SelectItem value="GBP">GBP (£)</SelectItem>
													<SelectItem value="IRR">IRR (﷼)</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</Field>
								</FieldGroup>
							</FieldSet>
						</FieldGroup>
					</div>
				</form>
			</SheetContent>
		</Sheet>
	);
}
