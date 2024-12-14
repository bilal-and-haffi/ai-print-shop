import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

import { sql } from "drizzle-orm";

export const imageTable = sqliteTable("image", {
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

export const orderTable = sqliteTable("orders", {
    id: integer("id").primaryKey(),
    printifyOrderId: text("printify_order_id"),
    printifyProductId: text("printify_product_id").notNull(),
    printifyVariantId: text("printify_variant_id").notNull(),
    stripeSessionId: text("stripe_session_id"),
    stripeCustomerId: text("stripe_customer_id"),
    quantity: integer("quantity").notNull(),
    status: text("status").notNull().default("payment_pending"),
    createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
});
