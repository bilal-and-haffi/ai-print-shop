import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe/service";
import { addNewOrder, updateOrderSessionId } from "@/db/order";

export async function POST(request: NextRequest) {
    const req = await request.json();

    const totalShipping = Number(0);
    const headersList = request.headers;
    const referer = headersList.get("referer") || "";
    const origin = headersList.get("origin") || "";

    const internalOrderId = await addNewOrder({
        printifyProductId: req.productId,
        printifyVariantId: req.orderVariantId,
        quantity: 1,
    });

    const session = await createCheckoutSession({
        referer,
        origin,
        totalStripePrice: req.price,
        totalShipping,
        orderTitle: req.order_title,
        orderVariantLabel: req.order_variant_label,
        orderPreview: req.order_preview,
        productId: req.productId,
        productType: req.productType,
        orderVariantId: req.orderVariantId,
        internalOrderId,
    });

    await updateOrderSessionId(internalOrderId, session.id);

    return NextResponse.json({ message: "success", url: session!.url! });
}
