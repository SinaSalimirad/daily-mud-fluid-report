import cors from "@elysia/cors";
import { openapi } from "@elysia/openapi";
import { Elysia } from "elysia";
import { corsConfig } from "./config/cors.config";
import { openapiConfig } from "./config/openapi.config";
import { inventoryController } from "./module/inventory";
import { productController } from "./module/product";

const app = new Elysia({ prefix: "/api" })
	.use(openapi(openapiConfig))
	.use(cors(corsConfig))
	.use(inventoryController)
	.use(productController)
	.get("/", () => "Hello World")
	.listen(4000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
