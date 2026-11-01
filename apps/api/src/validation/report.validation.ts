import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import { reports } from "@/schema/report.schema";

export const reportBaseSchema = createInsertSchema(reports, {
	operatorReporter: z.string().trim().min(1),
	contractorReporter: z.string().trim().min(1),
	date: z.iso.date(),
	wellStatus: z.string().trim().min(1),
	mudType: z.string().trim().min(1),
	trueVerticalDepth: z.coerce.number().nonnegative(),
	bitDepth: z.coerce.number().nonnegative(),
	totalDepth: z.coerce.number().nonnegative(),
	presentActivity: z.string().trim().min(1),
});

export const reportSchema = reportBaseSchema.pick({
	operatorReporter: true,
	contractorReporter: true,
	date: true,
	wellStatus: true,
	mudType: true,
	trueVerticalDepth: true,
	bitDepth: true,
	totalDepth: true,
	presentActivity: true,
});
