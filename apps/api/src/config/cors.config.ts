import type { CORSConfig } from "@elysia/cors";
import { env } from "@/helper/env";

export const corsConfig: CORSConfig = {
	origin: env.FRONTEND_ORIGIN,
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};
