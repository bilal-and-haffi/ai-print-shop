import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe/service";
import { T_SHIRT_PRICE_IN_GBP } from "@/app/data/consts";
import { addNewOrder } from "@/db/order";

export async function POST(request: NextRequest) {
  const req = await request.json();

  const totalShipping = Number(0);
  const totalStripePrice = Number(T_SHIRT_PRICE_IN_GBP) * 100;
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
    totalStripePrice,
    totalShipping,
    orderTitle: req.order_title,
    orderVariantLabel: req.order_variant_label,
    orderPreview: req.order_preview,
    productId: req.productId,
    orderVariantId: req.orderVariantId,
    internalOrderId,
  });

  return NextResponse.json({ message: "success", url: session!.url! });
}
