import { type Config, defineConfig } from "drizzle-kit";
import { env } from "./src/helper/env";

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/schema/*.schema.ts",
	out: "./drizzle",

	dbCredentials: {
		url: env.DATABASE_URL,
		ssl: false,
	},

	verbose: true,
	strict: true,
}) satisfies Config;
