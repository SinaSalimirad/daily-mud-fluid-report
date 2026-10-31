import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllProducts, getSearchProducts } from "@/lib/query";

export function useGetAllProducts() {
	return useQuery({
		queryKey: ["products", "list"],
		queryFn: getAllProducts,
		staleTime: 1000 * 60 * 2, // 2 minutes
		gcTime: 1000 * 60 * 10, // 10 minutes
	});
}

export function useSearchProducts(search: string = "") {
	const name = search.trim();

	return useQuery({
		queryKey: ["products", "list", name],
		queryFn: () =>
			name ? getSearchProducts({ name: search }) : getAllProducts(),
		placeholderData: keepPreviousData, // Prevent from jumping the list while typing
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 10,
	});
}
