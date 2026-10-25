import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
	connectionString:
		"postgres://postgres:STRONG_PASSWORD@localhost:5432/daily-mud-fluid-report",
});

export const db = drizzle(pool);

export type DB = typeof db;
