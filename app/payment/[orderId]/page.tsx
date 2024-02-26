import { PRINTIFY_BASE_URL } from "@/app/consts";
import { PrintifyOrderResponse } from "@/interfaces/PrintifyTypes";
import { log } from "@/functions/log";

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
  const { total_price, total_shipping, total_tax } = orderDetails;
  log({ total_price, total_shipping, total_tax });

  if (!total_price || !total_shipping || !total_tax) {
    console.error("Order Details are required", { orderDetails });
    console.error({ total_price, total_shipping, total_tax });
    return <div>Order Details are required</div>;
  }

  return (
    <>
      <h1>Order Details</h1>
      <p>Total Price: {total_price}</p>
      <p>Total Shipping: {total_shipping}</p>
      <p>Total Tax: {total_tax}</p>
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
