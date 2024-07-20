import { PRINTIFY_BASE_URL } from "@/app/data/consts";
import { v4 as uuidv4 } from "uuid";
import {
    AddressTo,
    EssentialProductDetails,
    LineItemBase,
    PrintifyImageResponse,
    PrintifyOrderExistingProductRequest,
    PrintifyOrderResponse,
    RetrieveProductResponse,
} from "@/interfaces/PrintifyTypes";
import { envServer } from "@/lib/env/server";
import { Variant } from "@/interfaces/Printify/Variant";

export async function createPrintifyOrderForExistingProduct(
    line_items: LineItemBase[],
    shipping_method: number,
    address_to: AddressTo,
) {
    const endpoint = `${PRINTIFY_BASE_URL}/v1/shops/${envServer.SHOP_ID}/orders.json`;
    const body: PrintifyOrderExistingProductRequest = {
        external_id: uuidv4(),
        line_items,
        shipping_method,
        send_shipping_notification: true,
        address_to,
    };

    const options: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${envServer.PRINTIFY_API_TOKEN}`,
        },
        body: JSON.stringify(body),
    };
    console.log({ endpoint, options });
    const orderResponse = (await (
        await fetch(endpoint, options)
    ).json()) as PrintifyOrderResponse;

    console.log({ orderId: orderResponse.id });
    return orderResponse;
}

export async function retrieveAProduct(product_id: string) {
    const endpoint = `${PRINTIFY_BASE_URL}/v1/shops/${envServer.SHOP_ID}/products/${product_id}.json`;
    const response = await fetch(endpoint, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${envServer.PRINTIFY_API_TOKEN}`,
        },
    });
    const product = (await response.json()) as RetrieveProductResponse;

    return product;
}

export async function getOrderDetails(orderId: string) {
    console.log({ orderId });

    const endpoint = `${PRINTIFY_BASE_URL}/v1/shops/${envServer.SHOP_ID}/orders/${orderId}.json`;
    const response = await fetch(endpoint, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${envServer.PRINTIFY_API_TOKEN}`,
        },
    });
    const orderDetails = (await response.json()) as PrintifyOrderResponse;
    console.log({ orderDetails });
    return orderDetails;
}

export async function publishPrintifyProduct(product_id: string) {
    const endpoint = `${PRINTIFY_BASE_URL}/v1/shops/${envServer.SHOP_ID}/products/${product_id}/publish.json`;
    const body = JSON.stringify({
        title: true,
        description: true,
        images: true,
        variants: true,
        tags: true,
        keyFeatures: true,
        shipping_template: true,
    });

    await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${envServer.PRINTIFY_API_TOKEN}`,
        },
        body,
    });
}

export async function postImageToPrintify(
    url: string,
    fileName: string,
): Promise<PrintifyImageResponse> {
    console.error({ msg: "postImageToPrintify" });
    try {
        const imageRequest = {
            file_name: fileName,
            url: url,
        };
        const imageRequestString = JSON.stringify(imageRequest);
        const endpoint = `${PRINTIFY_BASE_URL}/v1/uploads/images.json`;

        const imageResponse = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${envServer.PRINTIFY_API_TOKEN}`,
            },
            body: imageRequestString,
        });

        const imageData: PrintifyImageResponse = await imageResponse.json();

        console.error({ imageData });

        return imageData;
    } catch (error) {
        console.error("Error posting image to Printify", error);
        throw new Error("Error posting image to Printify");
    }
}

export function mapProductDetails(variant: Variant): EssentialProductDetails {
    return {
        id: variant.id,
        color: variant.options.color,
        size: variant.options.size,
    };
}
