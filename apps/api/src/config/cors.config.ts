import type { CORSConfig } from "@elysia/cors";

export const corsConfig: CORSConfig = {
	origin: "localhost:3000",
	methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
};
