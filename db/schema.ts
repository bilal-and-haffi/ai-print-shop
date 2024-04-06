import {
  pgTable,
  bigserial,
  integer,
  varchar,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const imageTable = pgTable("image", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  prompt: varchar("prompt").notNull(),
  printifyImageId: varchar("printify_image_id").notNull(),
  printifyImageUrl: varchar("printify_image_url").notNull(),
  printifyProductId: varchar("printify_product_id"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const orderTable = pgTable(
  "order",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    printifyOrderId: varchar("printify_order_id"),
    printifyProductId: varchar("printify_product_id").notNull(),
    printifyVariantId: varchar("printify_variant_id").notNull(),
    stripeCustomerId: varchar("stripe_customer_id"),
    quantity: integer("quantity").notNull(),
    status: varchar("status").notNull().default("payment_pending"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
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
