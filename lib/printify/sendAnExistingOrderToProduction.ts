import { PRINTIFY_BASE_URL } from "@/app/data/consts";
import { envServer } from "../env/server";

export async function sendAnExistingOrderToProduction(orderId: string) {
    const endpoint = `${PRINTIFY_BASE_URL}/v1/shops/${envServer.SHOP_ID}/orders/${orderId}/send_to_production.json`;

    if (envServer.VERCEL_ENV === "production") {
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${envServer.PRINTIFY_API_TOKEN}`,
                },
            });
            const { status } = response;
            const responseJson = await response.json();

            if (status >= 200 && status <= 300) {
                console.log({
                    msg: "Order sent to production",
                    orderId,
                    endpoint,
                    responseJson,
                });
            } else {
                console.error({ status, orderId, endpoint, responseJson });
                throw new Error("Send to production post failed");
            }
        } catch (error) {
            console.error({ error });
        }
    } else {
        console.log({
            msg: "Skipping sending order to production because this is a non prod environemnt.",
            orderId,
        });
    }
}
