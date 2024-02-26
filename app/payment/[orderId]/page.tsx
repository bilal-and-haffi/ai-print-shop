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
  return <></>;
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
