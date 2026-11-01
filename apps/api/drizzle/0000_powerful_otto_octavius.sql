CREATE TYPE "public"."product_origin" AS ENUM('foreign', 'local');--> statement-breakpoint
CREATE TYPE "public"."product_unit" AS ENUM('bbl', 'l', 'm³', 'kg', 'lb', 'ton', 'gal', 'm x m');--> statement-breakpoint
CREATE TYPE "public"."currency_code" AS ENUM('$', '£', '€', '¥', 'IRR');--> statement-breakpoint
CREATE TYPE "public"."designation" AS ENUM('exploration', 'cuttings', 're-injection', 'work-over', 'repairing', 're-entry', 'new leg', 'perforation', 'plugging');--> statement-breakpoint
CREATE TYPE "public"."rig_type" AS ENUM('offshore', 'onshore');--> statement-breakpoint
CREATE TYPE "public"."well_type" AS ENUM('Directional', 'Vertical');--> statement-breakpoint
CREATE TABLE "inventories" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_id" uuid NOT NULL,
	"init" integer DEFAULT 0 NOT NULL,
	"received" integer DEFAULT 0 NOT NULL,
	"used" integer DEFAULT 0 NOT NULL,
	"back_load" integer DEFAULT 0 NOT NULL,
	"note" text,
	"section_id" uuid NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"size" double precision NOT NULL,
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
CREATE TABLE "reports" (
	"id" uuid PRIMARY KEY NOT NULL,
	"operator_reporter" varchar(255) NOT NULL,
	"contractor_reporter" varchar(255) NOT NULL,
	"date" date NOT NULL,
	"well_status" varchar(255) NOT NULL,
	"mud_type" varchar(255) NOT NULL,
	"true_vertical_depth" double precision NOT NULL,
	"bit_depth" double precision NOT NULL,
	"total_depth" double precision NOT NULL,
	"present_activity" varchar(255) NOT NULL,
	"well_id" uuid NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sections" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"well_id" uuid NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wells" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"operator" varchar(255) NOT NULL,
	"contractor" varchar(255) NOT NULL,
	"field" varchar(255) NOT NULL,
	"designation" "designation" NOT NULL,
	"spud_date" date NOT NULL,
	"currency_code" "currency_code" NOT NULL,
	"type" "well_type" NOT NULL,
	"rig_name" varchar(255) NOT NULL,
	"rig_type" "rig_type" NOT NULL,
	"water_depth" double precision NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_well_id_wells_id_fk" FOREIGN KEY ("well_id") REFERENCES "public"."wells"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sections" ADD CONSTRAINT "sections_well_id_wells_id_fk" FOREIGN KEY ("well_id") REFERENCES "public"."wells"("id") ON DELETE no action ON UPDATE no action;