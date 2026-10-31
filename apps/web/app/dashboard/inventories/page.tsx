"use client";

import { useForm } from "@tanstack/react-form";

import { FromData } from "./form-data";

export default function ProductPage() {
	const form = useForm({
		onSubmit: async () => {
			console.log("value");
		},
	});

	return <FromData />;
}
