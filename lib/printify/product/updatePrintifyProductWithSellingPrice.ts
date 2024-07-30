import { PRINTIFY_BASE_URL } from "@/app/data/consts";
import { envServer } from "@/lib/env/server";

// maybe string would be better
export async function updatePrintifyProductAndVariantWithSellingPrice({
    priceInCents,
    productId,
    variantId,
}: {
    priceInCents: number;
    productId: string;
    variantId: number;
}) {
    console.log({
        msg: "updating printify product with selling price",
        priceInCents,
        productId,
        variantId,
    });
    const response = await fetch(
        `${PRINTIFY_BASE_URL}/v1/shops/${envServer.SHOP_ID}/products/${productId}.json`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${envServer.PRINTIFY_API_TOKEN}`,
            },
            body: JSON.stringify({
                variants: [
                    {
                        id: variantId,
                        price: Math.round(priceInCents),
                    },
                ],
            }),
        },
    );
    const responseJson = await response.json();
    console.log({ responseJson });
}
