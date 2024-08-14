import { PRINTIFY_BASE_URL } from "@/app/data/consts";
import { PrintifyImageResponse } from "@/interfaces/PrintifyTypes";
import { getPrintifyRequestHeaders } from "../getPrintifyHeaders";

export async function postBase64ImageToPrintify(
    base64ImageContents: string,
    fileName: string,
): Promise<PrintifyImageResponse> {
    try {
        const imageRequest = {
            file_name: fileName,
            contents: base64ImageContents,
        };
        const imageRequestString = JSON.stringify(imageRequest);
        console.log({ imageRequestString });
        const endpoint = `${PRINTIFY_BASE_URL}/v1/uploads/images.json`;

        const imageResponse = await fetch(endpoint, {
            method: "POST",
            headers: getPrintifyRequestHeaders(),
            body: imageRequestString,
        });

        const imageData: PrintifyImageResponse = await imageResponse.json();

        return imageData;
    } catch (error) {
        console.error("Error posting image to Printify", error);
        throw new Error("Error posting image to Printify");
    }
}
