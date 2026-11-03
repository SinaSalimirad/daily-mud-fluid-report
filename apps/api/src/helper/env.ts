import z from "zod";

const schema = z.object({
	NODE_ENV: z.enum(["development", "production"]),
	BACKEND_PORT: z.coerce.number().int().positive().default(4000),
	POSTGRES_DB: z.string().min(1),
	POSTGRES_HOST_PORT: z.coerce.number().int().positive(),
	POSTGRES_USER: z.string().min(1),
	POSTGRES_PASSWORD: z.string().min(1),
	DATABASE_URL: z.url().min(1),
	FRONTEND_ORIGIN: z.url().min(1),
});

export const env = schema.parse(process.env);
