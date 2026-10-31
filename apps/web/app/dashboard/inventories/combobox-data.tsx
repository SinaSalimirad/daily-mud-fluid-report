import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox";

type ComboboxOption = { id: string | number; name: string };

interface ComboboxCustomProps<T extends ComboboxOption> {
	items: T[];
	value: T | null;
	onValueChange: (value: T | null) => void;
	onSearchChange: (search: string) => void;
	placeholder?: string;
	isLoading?: boolean;
}

export function ComboboxCustom<T extends ComboboxOption>({
	items,
	value,
	onValueChange,
	onSearchChange,
	placeholder,
	isLoading,
}: ComboboxCustomProps<T>) {
	return (
		<Combobox
			items={items}
			value={value}
			onValueChange={onValueChange}
			onInputValueChange={(inputValue) => onSearchChange(inputValue)}
		>
			<ComboboxInput
				className="w-full h-10"
				placeholder={placeholder}
				showClear
			/>
			<ComboboxContent>
				<ComboboxEmpty>
					{/* /**
					 * TODO:
					 * Add a component to create item if it is not exist
					 */}
					{isLoading ? "Searching..." : "No items found."}
				</ComboboxEmpty>
				<ComboboxList>
					{(item: T) => (
						<ComboboxItem key={item.id} value={item}>
							{item.name}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
}
