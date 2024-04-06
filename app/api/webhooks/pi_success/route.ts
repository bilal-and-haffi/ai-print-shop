import { NextRequest, NextResponse } from "next/server";
import { createPrintifyOrderForExistingProduct } from "@/lib/printify/service";
import { LineItemBase } from "@/interfaces/PrintifyTypes";
import { getCountry } from "@/lib/postcode/getCountry";
import { updateOrderStatus } from "@/db/order";

export async function POST(request: NextRequest) {
    const req = await request.json();
    const eventData = req.data;
    const shipping = eventData.object.shipping;
    const metaData = eventData.object.metadata;
    const stripeCustomerId = eventData.object.customer;

    console.log({ shipping, metaData });

    // update order status to payment_received
    await updateOrderStatus({
        internalOrderId: metaData.internalOrderId,
        status: "payment_received",
    });

    const quantity = 1; // make me dynamic
    const line_items: LineItemBase[] = [
        {
            product_id: metaData.productId,
            variant_id: metaData.orderVariantId,
            quantity,
        },
    ];

    const shipping_method = 1; // make me dynamic

    const orderResponse = await createPrintifyOrderForExistingProduct(
        line_items,
        shipping_method,
        {
            first_name: shipping.name.split(" ")[0],
            last_name: shipping.name.split(" ")[1],
            email: shipping.email,
            phone: shipping.phone,
            country: shipping.address.country,
            region:
                shipping.address.state ||
                (await getCountry(shipping.address.postal_code)),
            address1: shipping.address.line1,
            address2: shipping.address.line2,
            city: shipping.address.city,
            zip: shipping.address.postal_code,
        },
    );

    console.log({
        orderId: orderResponse.id,
        printifyConnect: orderResponse.printify_connect,
    });

    await updateOrderStatus({
        internalOrderId: metaData.internalOrderId,
        status: "ordered",
        printifyOrderId: orderResponse.id,
        stripeCustomerId,
    });

    return NextResponse.json({ message: "success" });
}
