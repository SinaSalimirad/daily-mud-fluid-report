import { pgTable } from "drizzle-orm/pg-core";
import { timestamps, uuidv7 } from "./_shared/columns";

export const sections = pgTable("section", (t) => ({
	id: uuidv7,
	name: t.varchar("name", { length: 255 }).notNull(),

	// wellId: uuid("well_id")
	// 	.references(() => well.id)
	// 	.notNull(),

	...timestamps,
}));
