import { cors } from "@elysia/cors";
import { openapi } from "@elysia/openapi";
import { Elysia } from "elysia";
import { logixlysia } from "logixlysia";
import { corsConfig } from "./config/cors.config";
import { logixlysiaConfig } from "./config/logixlysia.config";
import { openapiConfig } from "./config/openapi.config";
import { env } from "./helper/env";
import { inventoryController } from "./module/inventory";
import { productController } from "./module/product";

new Elysia({ prefix: "/api" })
	.use(openapi(openapiConfig))
	.use(cors(corsConfig))
	.use(logixlysia({ config: logixlysiaConfig }))
	.use(inventoryController)
	.use(productController)
	.get("/", () => "Hello World")
	.listen(env.BACKEND_PORT);
