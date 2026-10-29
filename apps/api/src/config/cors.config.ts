import type { CORSConfig } from "@elysia/cors";

export const corsConfig: CORSConfig = {
	origin: "*",
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};
