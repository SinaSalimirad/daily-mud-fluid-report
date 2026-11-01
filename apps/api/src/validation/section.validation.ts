import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import { sections } from "@/schema/section.schema";

export const sectionBaseSchema = createInsertSchema(sections, {
	name: z.string().trim().min(1),
	wellId: z.uuid(),
});

export const sectionSchema = sectionBaseSchema.pick({
	name: true,
	wellId: true,
});

export type Section = z.infer<typeof sectionSchema>;
