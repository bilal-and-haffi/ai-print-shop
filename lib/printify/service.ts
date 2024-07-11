import { PRINTIFY_BASE_URL } from "@/app/data/consts";
import { v4 as uuidv4 } from "uuid";
import {
    AddressTo,
    EssentialProductDetails,
    LineItemBase,
    PrintifyOrderExistingProductRequest,
    PrintifyOrderResponse,
    PrintifyProductRequest,
    RetrieveProductResponse,
} from "@/interfaces/PrintifyTypes";
import { envServer } from "@/lib/env/server";
import { fetchProductVariants } from "./fetchProductVariants";
import { Variant } from "@/interfaces/Printify/Variant";

async function constructPrintifyProductRequest({
    printifyImageId,
    printProviderId,
    blueprintId,
}: {
    printifyImageId: string;
    printProviderId: number;
    blueprintId: number;
}) {
    const variants = await fetchProductVariants(blueprintId, printProviderId);
    const variantIds = variants.map((variant) => variant.id);
    const prompt = "x"; // FIXME: await getPromptFromImageId(printifyImageId);

    const productRequest: PrintifyProductRequest = {
        blueprint_id: blueprintId,
        description: "",
        print_areas: [
            {
                variant_ids: variantIds,
                placeholders: [
                    {
                        position: "front",
                        images: [
                            {
                                id: printifyImageId,
                                x: 0.5,
                                y: 0.5,
                                scale: 1,
                                angle: 0,
                            },
                        ],
                    },
                ],
            },
        ],
        print_provider_id: printProviderId,
        title: prompt,
        variants: variantIds.map((variantId) => ({
            id: variantId,
            price: 1, // ???
        })),
    };
    return productRequest;
}

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

export async function createPrintifyProduct({
    printifyImageId,
    printProviderId,
    blueprintId,
}: {
    printifyImageId: string;
    printProviderId: number;
    blueprintId: number;
}) {
    const {
        blueprint_id,
        description,
        print_areas,
        print_provider_id,
        title,
        variants,
    } = await constructPrintifyProductRequest({
        printifyImageId,
        printProviderId,
        blueprintId,
    });

    const productRequest: PrintifyProductRequest = {
        blueprint_id,
        description,
        print_areas,
        print_provider_id,
        title,
        variants,
    };
    const productRequestString = JSON.stringify(productRequest);

    const productResponse: any = await fetch(
        `${PRINTIFY_BASE_URL}/v1/shops/${envServer.SHOP_ID}/products.json`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${envServer.PRINTIFY_API_TOKEN}`,
            },
            body: productRequestString,
        },
    );
    const productData = await productResponse.json();
    return productData;
}

export function mapProductDetails(variant: Variant): EssentialProductDetails {
    return {
        id: variant.id,
        color: variant.options.color,
        size: variant.options.size,
    };
}
