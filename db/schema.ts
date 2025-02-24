import { sql } from "drizzle-orm";

import { pgTable, serial, text, varchar, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    fullName: text("full_name"),
    phone: varchar("phone", { length: 256 }),
});

export const imageTable = pgTable("image", {
    id: integer("id").primaryKey(),
    prompt: text("prompt").notNull(),
    printifyImageId: text("printify_image_id").notNull(),
    printifyImageUrl: text("printify_image_url").notNull(),
    removedBackgroundPrintifyImageId: text(
        "removed_background_printify_image_id",
    ),
    removedBackgroundPrintifyImageUrl: text(
        "removed_background_printify_image_url",
    ),
    printifyProductId: text("printify_product_id"),
    createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
});

export const orderTable = pgTable("orders", {
    id: integer("id").primaryKey(),
    printifyOrderId: text("printify_order_id"),
    printifyProductId: text("printify_product_id").notNull(),
    printifyVariantId: text("printify_variant_id").notNull(),
    stripeSessionId: text("stripe_session_id"),
    stripeCustomerId: text("stripe_customer_id"),
    quantity: integer("quantity").notNull(),
    status: text("status").notNull().default("payment_pending"),
    createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
    emailId: text("email_id"),
});
