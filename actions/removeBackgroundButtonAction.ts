"use server";

import { addToImageTable, getPromptFromImageId } from "@/db/image";
import { removeBackgroundAndReturnBase64Image } from "./removeBackgroundAndReturnBase64Image";
import { redirect } from "next/navigation";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import { postBase64ImageToPrintify } from "@/lib/printify/postBase64ImageToPrintify";

export async function removeBackgroundButtonAction({url, printifyImageId, country}: {url: string, printifyImageId: string, country: CountryCode}) {
    console.log("remove background button action");
    const removedBackgroundImageBase64Contents =
    await removeBackgroundAndReturnBase64Image(url);
    const prompt = await getPromptFromImageId(printifyImageId);
    const { id: newPrintifyImageId } = await postBase64ImageToPrintify(
        removedBackgroundImageBase64Contents,
        "generatedImage.png",
    );
    await addToImageTable({
        prompt,
        printifyImageId: newPrintifyImageId,
        printifyImageUrl: url,
    });

    redirect(`/product/${newPrintifyImageId}?country=${country}`)
}
