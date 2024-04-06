import { orderTable } from "@/db/schema";
import { dbClient } from "@/db/client";
import { eq } from "drizzle-orm";

export type OrderStatusEnum =
    | "payment_pending"
    | "payment_received"
    | "ordered"
    | "shipped"
    | "delivered";

type CreateOrderParams = typeof orderTable.$inferInsert;
export async function addNewOrder(createOrderParams: CreateOrderParams) {
    const result = await dbClient
        .insert(orderTable)
        .values(createOrderParams)
        .returning({ internalOrderId: orderTable.id });
    return result[0].internalOrderId;
}

interface UpdateOrderStatusParams {
    internalOrderId: number;
    status: OrderStatusEnum;
    stripeCustomerId?: string;
    printifyOrderId?: string;
}

export async function updateOrderStatus(
    updateOrderStatusParams: UpdateOrderStatusParams,
) {
    const { internalOrderId, status, stripeCustomerId, printifyOrderId } =
        updateOrderStatusParams;
    return await dbClient
        .update(orderTable)
        .set({ status, stripeCustomerId, printifyOrderId })
        .where(eq(orderTable.id, internalOrderId));
}
