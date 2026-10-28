import { openapi } from "@elysia/openapi";
import { Elysia } from "elysia";
import { logixlysia } from "logixlysia";
import { logixlysiaConfig } from "./config/logixlysia.config";
import { openapiConfig } from "./config/openapi.config";
import { inventoryController } from "./module/inventory";
import { productController } from "./module/product";

new Elysia({ prefix: "/api" })
	.use(openapi(openapiConfig))
	.use(logixlysia({ config: logixlysiaConfig }))
	.use(inventoryController)
	.use(productController)
	.get("/", () => "Hello World")
	.listen(4000);
