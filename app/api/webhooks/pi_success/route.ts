import { NextRequest, NextResponse } from 'next/server';
import { log } from '@/utils/log';
import { createPrintifyOrderForExistingProduct } from '@/lib/printify/service';
import { LineItemBase } from '@/interfaces/PrintifyTypes';

export async function POST(request: NextRequest) {
  const req = await request.json();

  const eventData = req.data;

  const shipping = eventData.object.shipping;

  const metaData = eventData.object.metadata;

  console.log({ shipping, metaData });


  const line_items: LineItemBase[] = [
    {
      product_id: metaData.productId,
      variant_id: metaData.orderVariantId,
      quantity: 1,
    },
  ];

  const shipping_method = 1; // make me dynamic

  const orderId = await createPrintifyOrderForExistingProduct(
    line_items,
    shipping_method,
    {
      first_name: shipping.name.split(" ")[0],
      last_name: shipping.name.split(" ")[1],
      email: shipping.email,
      phone: shipping.phone,
      country: shipping.address.country,
      region: shipping.address.state,
      address1: shipping.address.line1,
      address2: shipping.address.line2,
      city: shipping.address.city,
      zip: shipping.address.postal_code,
    }
  );

  log({ orderId });

  return NextResponse.json({ message: "success" });
}