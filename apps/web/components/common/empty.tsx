import { cn } from "cn";
import type { ComponentProps } from "react";

export function EmptyValue({
	className,
}: {
	className?: ComponentProps<"div">["className"];
}) {
	return (
		<div className={cn(`text-center text-muted-foreground`, className)}>
			<span aria-hidden="true">—</span>
			<span className="sr-only">Not specified</span>
		</div>
	);
}
