import { PRINTIFY_BASE_URL } from "@/app/consts";
import {
  PrintifyShippingResponse,
  PrintifyShippingRequest,
} from "@/interfaces/PrintifyTypes";
import { logWithTimestamp } from "./logWithTimeStamp";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function dislpayShippingCosts(shippingCost: PrintifyShippingResponse) {
  const elements = [];
  for (const [key, value] of Object.entries(shippingCost)) {
    elements.push(
      <p key={key}>
        {capitalizeFirstLetter(key)}: {value}
      </p>,
    );
  }
  return elements;
}

async function calculateShippingCost(productId: string, quantity: number) {
  const endpoint = `${PRINTIFY_BASE_URL}/v1/shops/${process.env.SHOP_ID}/orders/shipping.json`;
  const body: PrintifyShippingRequest = {
    line_items: [
      {
        product_id: productId,
        quantity,
        variant_id: 38192,
      },
    ],
    address_to: {
      first_name: "John",
      last_name: "Smith",
      email: "example@msn.com",
      phone: "0574 69 21 90",
      country: "BE",
      region: "",
      address1: "ExampleBaan 121",
      address2: "45",
      city: "Retie",
      zip: "2470",
    },
  };
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
    },
    body: JSON.stringify(body),
  };

  logWithTimestamp("calculateShippingCost", { endpoint, options });
  const shippingResponse = await (await fetch(endpoint, options)).json();
  logWithTimestamp("calculateShippingCost", { shippingResponse });

  return shippingResponse;
}
