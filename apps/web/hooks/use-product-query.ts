import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/query";

export function useGetProducts() {
	return useQuery({
		queryKey: ["products", "list"],
		queryFn: getProducts,
		staleTime: 0,
		gcTime: 0,
	});
}
