import { orderTable } from "@/db/schema";
import { dbClient } from "@/db/client";
import { eq } from "drizzle-orm";

// these happen in this order
export type OrderStatusEnum =
    | "payment_pending"
    | "payment_received"
    | "ordered"
    | "shipped" // unused right now
    | "delivered"; // unused right now

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
    try {
        const { internalOrderId, status, stripeCustomerId, printifyOrderId } =
            updateOrderStatusParams;
        return await dbClient
            .update(orderTable)
            .set({ status, stripeCustomerId, printifyOrderId })
            .where(eq(orderTable.id, internalOrderId));
    } catch (error) {
        console.error({ error, msg: "Failed to update order status" });
    }
}

export async function getEmailIdFromOrderTable({
    internalOrderId,
}: {
    internalOrderId: number;
}) {
    return (
        await dbClient
            .select({ emailId: orderTable.emailId })
            .from(orderTable)
            .where(eq(orderTable.id, internalOrderId))
    )[0].emailId;
}

export async function addEmailIdToOrderTable({
    internalOrderId,
    emailId,
}: {
    internalOrderId: number;
    emailId: string;
}) {
    return await dbClient
        .update(orderTable)
        .set({ emailId })
        .where(eq(orderTable.id, internalOrderId));
}

export async function updateOrderSessionId(
    internalOrderId: number,
    stripeSessionId: string,
) {
    return await dbClient
        .update(orderTable)
        .set({ stripeSessionId })
        .where(eq(orderTable.id, internalOrderId));
}

export type OrderRow = typeof orderTable.$inferSelect;
export async function getOrderById(internalOrderId: number) {
    const resp = await dbClient
        .select()
        .from(orderTable)
        .where(eq(orderTable.id, internalOrderId));
    return resp[0];
}
