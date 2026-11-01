import { pgTable, uuid } from "drizzle-orm/pg-core";
import { timestamps, uuidv7 } from "./_shared/columns";
import { wells } from "./well.schema";

export const sections = pgTable("sections", (t) => ({
	id: uuidv7,
	name: t.varchar("name", { length: 255 }).notNull(),

	wellId: uuid("well_id")
		.references(() => wells.id)
		.notNull(),

	...timestamps,
}));
