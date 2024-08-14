"use server";

import { PRINTIFY_BASE_URL } from "@/app/data/consts";
import { getPrintifyRequestHeaders } from "../getPrintifyHeaders";

export async function getImageUrlFromPrintify({
    imageId,
}: {
    imageId: string;
}) {
    const endpoint = `${PRINTIFY_BASE_URL}/v1/uploads/${imageId}.json`;
    const options: RequestInit = {
        headers: getPrintifyRequestHeaders(),
    };
    const response = await fetch(endpoint, options);
    const responseJson = await response.json();
    return responseJson.preview_url;
}
