"use server";

import {
    addToImageTable,
    selectAllFromImageWhereImageIdEquals,
} from "@/db/image";
import { removeBackgroundAndReturnBase64Image } from "./removeBackgroundAndReturnBase64Image";
import { redirect } from "next/navigation";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import { postBase64ImageToPrintify } from "@/lib/printify/postBase64ImageToPrintify";

export async function removeBackgroundButtonAction({
    printifyImageId,
    country,
}: {
    printifyImageId: string;
    country: CountryCode;
}) {
    console.log("remove background button action");

    const { prompt, printifyImageUrl } =
        await selectAllFromImageWhereImageIdEquals(printifyImageId);
    const removedBackgroundImageBase64Contents =
        await removeBackgroundAndReturnBase64Image(printifyImageUrl);
    const { id: newPrintifyImageId, preview_url } =
        await postBase64ImageToPrintify(
            removedBackgroundImageBase64Contents,
            "generatedImage.png",
        );
    await addToImageTable({
        prompt,
        printifyImageId: newPrintifyImageId,
        printifyImageUrl: preview_url,
    });

    redirect(`/product/${newPrintifyImageId}?country=${country}`);
}
