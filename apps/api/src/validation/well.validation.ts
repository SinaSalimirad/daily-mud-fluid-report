import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import {
	CurrencyCode,
	Designation,
	RigType,
	WellType,
} from "@/schema/enums.schema";
import { wells } from "@/schema/well.schema";

export const wellBaseSchema = createInsertSchema(wells, {
	operator: z.string().trim().min(1),
	contractor: z.string().trim().min(1),
	field: z.string().trim().min(1),
	designation: z.enum(Designation),
	spudDate: z.iso.date(),
	currencyCode: z.enum(CurrencyCode),
	wellType: z.enum(WellType),
	rigName: z.string().trim().min(1),
	rigType: z.enum(RigType),
	waterDepth: z.coerce.number().nonnegative(),
});

export const wellSchema = wellBaseSchema.pick({
	operator: true,
	contractor: true,
	field: true,
	designation: true,
	spudDate: true,
	currencyCode: true,
	wellType: true,
	rigName: true,
	rigType: true,
	waterDepth: true,
});
