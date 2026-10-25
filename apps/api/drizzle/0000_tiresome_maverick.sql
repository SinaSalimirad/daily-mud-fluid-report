CREATE TYPE "public"."product_origin" AS ENUM('foreign', 'local');--> statement-breakpoint
CREATE TYPE "public"."product_unit" AS ENUM('bbl', 'l', 'm³', 'kg', 'lb', 'ton', 'gal', 'm x m');--> statement-breakpoint
CREATE TABLE "inventories" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_name" varchar(255) NOT NULL,
	"init" integer DEFAULT 0 NOT NULL,
	"received" integer DEFAULT 0 NOT NULL,
	"used" integer DEFAULT 0 NOT NULL,
	"back_load" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"quantity" double precision NOT NULL,
	"width" double precision,
	"height" double precision,
	"unit" "product_unit" NOT NULL,
	"sg" double precision,
	"origin" "product_origin" NOT NULL,
	"unit_price" double precision,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "products_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_product_name_products_name_fk" FOREIGN KEY ("product_name") REFERENCES "public"."products"("name") ON DELETE no action ON UPDATE no action;