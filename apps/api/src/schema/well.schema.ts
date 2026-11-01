import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import { timestamps, uuidv7 } from "./_shared/columns";
import { CurrencyCode, Designation, RigType, WellType } from "./enums.schema";

export const designationEnum = pgEnum("designation", Designation);
export const currencyCodeEnum = pgEnum("currency_code", CurrencyCode);
export const wellTypeEnum = pgEnum("well_type", WellType);
export const rigTypeEnum = pgEnum("rig_type", RigType);

export const wells = pgTable("wells", (t) => ({
	id: uuidv7,
	name: t.varchar("name", { length: 255 }).notNull(),

	// FIXME: In future, we should store 2 or 3 operator names for wells, as some wells have multiple operators. For now, we will just store the first operator name.
	operator: t.varchar("operator", { length: 255 }).notNull(),

	// FIXME: In future, we should store 2 or 3 operator names for wells, as some wells have multiple contractors. For now, we will just store the first contractor name.
	contractor: t.varchar("contractor", { length: 255 }).notNull(),
	field: t.varchar("field", { length: 255 }).notNull(),
	designation: designationEnum("designation").notNull(),
	spudDate: t.date("spud_date").notNull(),
	currencyCode: currencyCodeEnum("currency_code").notNull(),
	wellType: wellTypeEnum("type").notNull(),
	rigName: t.varchar("rig_name", { length: 255 }).notNull(),
	rigType: rigTypeEnum("rig_type").notNull(),
	waterDepth: t.doublePrecision("water_depth").notNull(),
	...timestamps,
}));
