import { pgTable } from "drizzle-orm/pg-core";
import { timestamps, uuidv7 } from "./_shared/columns";
import { wells } from "./well.schema";

export const reports = pgTable("reports", (t) => ({
	id: uuidv7,

	operatorReporter: t.varchar("operator_reporter", { length: 255 }).notNull(),
	contractorReporter: t
		.varchar("contractor_reporter", { length: 255 })
		.notNull(),

	date: t.date().notNull(),

	wellStatus: t.varchar("well_status", { length: 255 }).notNull(),
	mudType: t.varchar("mud_type", { length: 255 }).notNull(),

	trueVerticalDepth: t.doublePrecision("true_vertical_depth").notNull(),
	bitDepth: t.doublePrecision("bit_depth").notNull(),
	totalDepth: t.doublePrecision("total_depth").notNull(),

	presentActivity: t.varchar("present_activity", { length: 255 }).notNull(),

	wellId: t
		.uuid("well_id")
		.references(() => wells.id)
		.notNull(),

	...timestamps,
}));
