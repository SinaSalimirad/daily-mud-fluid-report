CREATE TABLE "section" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "inventories" DROP CONSTRAINT "inventories_product_name_products_name_fk";
--> statement-breakpoint
ALTER TABLE "inventories" ADD COLUMN "product_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "inventories" ADD COLUMN "note" text;--> statement-breakpoint
ALTER TABLE "inventories" ADD COLUMN "section_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_section_id_section_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."section"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventories" DROP COLUMN "product_name";