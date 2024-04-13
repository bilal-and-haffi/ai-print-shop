import { Button } from "@/components/ui/button";
import { getOrderById } from "@/db/order";
import { getOrderDetails } from "@/lib/printify/service";
import Link from "next/link";
import { Suspense } from "react";
import { type PrintifyOrderResponse } from "@/interfaces/PrintifyTypes";
import { type OrderRow } from "@/db/order";

export const dynamic = "force-dynamic";

const pollForInternalOrder = async (
    internalOrderId: number,
): Promise<OrderRow> => {
    const order = await getOrderById(internalOrderId);
    if (order.printifyOrderId) {
        return order;
    } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return pollForInternalOrder(internalOrderId);
    }
};

const pollForPrintifyOrder = async (
    printifyOrderId: string,
): Promise<PrintifyOrderResponse> => {
    const order = await getOrderDetails(printifyOrderId);
    if (order.printify_connect) {
        return order;
    } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return pollForPrintifyOrder(printifyOrderId);
    }
};

export default async function Page(params: {
    searchParams: { orderId: string };
}) {
    const internalOrderId = Number(params.searchParams.orderId);

    const { printifyOrderId } = await pollForInternalOrder(internalOrderId);

    const printifyOrder = await pollForPrintifyOrder(printifyOrderId!);

    return (
        <div className="flex flex-col items-center space-y-5">
            <p>Your payment has been successfully processed 🎉🎉</p>
            <Link href="/">
                <Button>Continue shopping</Button>
            </Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Link href={printifyOrder.printify_connect.url}>
                    <Button>Track order</Button>
                </Link>
            </Suspense>
        </div>
    );
}
