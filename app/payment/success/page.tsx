import { Button } from "@/components/ui/button";
import {
    addEmailIdToOrderTable,
    getEmailIdFromOrderTable,
    getOrderById,
} from "@/db/order";
import { getOrderDetails } from "@/lib/printify/service";
import Link from "next/link";
import { Suspense } from "react";
import { type PrintifyOrderResponse } from "@/interfaces/PrintifyTypes";
import { type OrderRow } from "@/db/order";
import { sendOrderConfirmationEmail } from "@/lib/email/sendOrderConfirmationEmail";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { track } from "@vercel/analytics/server";

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

    if (!printifyOrderId) {
        console.log("No printify order id for internal order", internalOrderId);
        throw new Error("No printify order id");
    }
    track("Payment Success");

    const printifyOrder = await pollForPrintifyOrder(printifyOrderId);

    const existingEmailId = await getEmailIdFromOrderTable({ internalOrderId });
    const hasSentEmailAlready = Boolean(existingEmailId);

    console.log({ emailId: existingEmailId, hasSentEmailAlready });

    if (hasSentEmailAlready) {
        console.log("Email has already been sent so skipping email sending");
    } else {
        const emailId = await sendOrderConfirmationEmail(
            printifyOrder.address_to.email,
            printifyOrder.address_to.first_name,
            printifyOrder.printify_connect.url,
        );
        if (emailId) {
            addEmailIdToOrderTable({ internalOrderId, emailId });
        }
    }

    return (
        <Card className="w-full p-4 md:w-2/3">
            <CardHeader>
                <CardTitle>Your order has been confirmed!</CardTitle>
            </CardHeader>
            <CardContent>
                <p>A confirmation has been sent to your email</p>
                <br />
                <p>Thank you for shopping with us. </p>
                <br />
                <p>We hope you love your product!</p>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 md:flex-row md:justify-normal">
                <Link className="w-full" href="/">
                    <Button className="w-full">Continue shopping</Button>
                </Link>
                <Suspense fallback={<div>Loading...</div>}>
                    <Link
                        className="w-full"
                        href={printifyOrder.printify_connect.url}
                    >
                        <Button className="w-full">Track order</Button>
                    </Link>
                </Suspense>
                <Link className="w-full" href="/support">
                    <Button className="w-full">Leave feedback</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
