import {
    pgTable,
    bigserial,
    integer,
    varchar,
    timestamp,
    uniqueIndex,
    bigint,
} from "drizzle-orm/pg-core";

export const promptTable = pgTable("prompt", {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    prompt: varchar("prompt").notNull(),
});

export const imageTable = pgTable("image", {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    promptId: integer("prompt_id").references(() => promptTable.id),
    imageUrl: varchar("image_url").notNull(),
});

export const orderTable = pgTable(
    "orders",
    {
        id: bigserial("id", { mode: "number" }).primaryKey(),
        printifyOrderId: varchar("printify_order_id"),
        printifyProductId: varchar("printify_product_id").notNull(),
        printifyVariantId: varchar("printify_variant_id").notNull(),
        stripeSessionId: varchar("stripe_session_id"),
        stripeCustomerId: varchar("stripe_customer_id"),
        quantity: integer("quantity").notNull(),
        status: varchar("status").notNull().default("payment_pending"),
        createdAt: timestamp("created_at", { mode: "date" })
            .defaultNow()
            .notNull(),
        emailId: varchar("email_id"),
    },
    (orders) => {
        return {
            uniqueOrderIdx: uniqueIndex("unique_order_idx").on(
                orders.printifyOrderId,
            ),
            uniqueCustomerIdx: uniqueIndex("unique_customer_idx").on(
                orders.stripeCustomerId,
                orders.printifyProductId,
            ),
        };
    },
);
