import { z } from "zod";
import { PRINTIFY_BASE_URL } from "@/app/consts";
import { PrintifyOrderResponse } from "@/interfaces/PrintifyTypes";
import { log } from "@/functions/log";
import { ProductDetails } from "@/app/components/ProductDetails";
import { retrieveAProduct } from "@/functions/retrieveAProduct";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createCheckoutSession } from "@/lib/stripe/service";

export default async function PaymentPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { orderId } = params;

  if (!orderId) {
    console.error("Order ID is required", { params });
    console.error({ orderId });
    return <div>Order ID is required</div>;
  }

  const orderDetails = await getOrderDetails(orderId);
  log({ orderDetails });
  const { total_price, total_shipping, total_tax, line_items } = orderDetails;

  if ([total_price, total_shipping, total_tax].some((x) => x === undefined)) {
    console.error("Order Details are required", { orderDetails });
    console.error({ total_price, total_shipping, total_tax });
    return <div>Order Details are required</div>;
  }

  const retrievedProducts = await Promise.all(
    orderDetails.line_items.map(
      async (x) => await retrieveAProduct(x.product_id),
    ),
  );

  return (
    <>
      <h1 className="text-xl">Order Details</h1>
      <p>Total Price: {total_price}</p>
      <p>Total Shipping: {total_shipping}</p>
      <p>Total Tax: {total_tax}</p>
      <p>Total: {total_price + total_shipping + total_tax}</p>

      <form
        action={handleCheckout}
        className="mt-8 block w-1/5 rounded-md py-2 text-center text-sm font-semibold text-white ring-2 bg-blue-500 hover:bg-blue-800 hover:ring-0"
      >
        <input type="hidden" name="total_price" value={total_price} />
        <input type="hidden" name="total_shipping" value={total_shipping} />
        <input
          type="hidden"
          name="order_title"
          value={line_items[0].metadata.title}
        />
        <input
          type="hidden"
          name="order_variant_label"
          value={line_items[0].metadata.variant_label}
        />
        <input
          type="hidden"
          name="order_preview"
          value={retrievedProducts[0].images[0].src}
        />
        <button type="submit">Proceed to checkout</button>
      </form>
      <h1 className="text-xl pt-8">Your Basket</h1>
      {retrievedProducts.map((retrievedProduct) => (
        <ProductDetails retrievedProduct={retrievedProduct} />
      ))}
    </>
  );
}

async function getOrderDetails(orderId: string) {
  const endpoint = `${PRINTIFY_BASE_URL}/v1/shops/${process.env.SHOP_ID}/orders/${orderId}.json`;
  const response = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
    },
  });
  const orderDetails = (await response.json()) as PrintifyOrderResponse;
  log({ orderDetails });
  return orderDetails;
}

async function handleCheckout(formData: FormData) {
  "use server";
  const rawFormData = Object.fromEntries(formData.entries());
  const schema = z.object({
    total_price: z.string(),
    total_shipping: z.string(),
    order_title: z.string(),
    order_variant_label: z.string(),
    order_preview: z.string(),
  });
  const parsedFormData = schema.parse(rawFormData);
  const totalShipping = Number(parsedFormData.total_shipping);
  const totalStripePrice = Number(parsedFormData.total_price) - totalShipping;
  const headersList = headers();
  const referer = headersList.get("referer") || "";
  const origin = headersList.get("origin") || "";

  const session = await createCheckoutSession({
    referer,
    origin,
    totalStripePrice,
    totalShipping,
    orderTitle: parsedFormData.order_title,
    orderVariantLabel: parsedFormData.order_variant_label,
    orderPreview: parsedFormData.order_preview,
  });
  redirect(session!.url!);
}
