import { type Config, defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/schema/*.schema.ts",
	out: "./drizzle",

	dbCredentials: {
		url: "postgres://postgres:STRONG_PASSWORD@localhost:5432/daily-drilling-fluid-report",
		ssl: false,
	},

	verbose: true,
	strict: true,
}) satisfies Config;
