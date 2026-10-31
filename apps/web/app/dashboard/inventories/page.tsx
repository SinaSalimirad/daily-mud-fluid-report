"use client";

import { useForm } from "@tanstack/react-form";

import { FromData } from "./form-data";

export default function ProductPage() {
	const form = useForm({
		onSubmit: async () => {
			console.log("value");
		},
	});

	return (
		<FromData />
		// <form>
		//   <FieldGroup>
		//     <FieldSet>
		//       <FieldLegend>Information</FieldLegend>
		//       <FieldDescription>add a description here</FieldDescription>
		//       <FieldGroup>
		//         <FieldLabel>Product Name</FieldLabel>
		//         <Field orientation="horizontal">
		//           <ComboboxCustom placeholder="Select a product" items={[]} />
		//         </Field>
		//         <Field className="grid grid-cols-2 gap-4">
		//           <Field>
		//             <FieldLabel htmlFor="package">Package</FieldLabel>
		//             <Input id="package" type="text" className="h-10" disabled />
		//           </Field>
		//           <Field>
		//             <FieldLabel htmlFor="unit-price">Unit Price</FieldLabel>
		//             <Input id="unit-price" type="text" className="h-10" disabled />
		//           </Field>
		//         </Field>
		//       </FieldGroup>
		//     </FieldSet>
		//     <FieldSeparator />
		//     <FieldSet>
		//       <FieldLegend>Management</FieldLegend>
		//       <FieldDescription>add a description here</FieldDescription>
		//       <FieldGroup>
		//         <Field className="grid grid-cols-3 gap-4">
		//           <Field>
		//             <FieldLabel htmlFor="package">Initial Stock</FieldLabel>
		//             <Input id="package" type="text" className="h-10" />
		//           </Field>
		//           <Field>
		//             <FieldLabel htmlFor="unit-price">Daily Used</FieldLabel>
		//             <Input id="unit-price" type="text" className="h-10" />
		//           </Field>
		//           <Field>
		//             <FieldLabel htmlFor="unit-price">Daily Received</FieldLabel>
		//             <Input id="unit-price" type="text" className="h-10" />
		//           </Field>
		//         </Field>
		//         <Textarea placeholder="Add details if you need "></Textarea>
		//       </FieldGroup>
		//     </FieldSet>
		//     <Button
		//       type="submit"
		//       onClick={() => {
		//         console.log("submitting");
		//       }}
		//       className="h-10 w-full cursor-pointer"
		//     >
		//       Submit
		//     </Button>
		//   </FieldGroup>
		// </form>
	);
}
