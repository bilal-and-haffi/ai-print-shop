import { PRINTIFY_BASE_URL } from "@/app/data/consts";
import { PrintifyProductRequest } from "@/interfaces/PrintifyTypes";
import { envServer } from "../env/server";
import { constructPrintifyProductRequest } from "./constructPrintifyProductRequest";

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
