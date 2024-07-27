"use server";

import {
    selectAllFromImageWhereImageIdEquals,
    updateImageTableWithRemovedBackgroundImage,
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

    const {
        printifyImageUrl,
        removedBackgroundPrintifyImageId:
            existingRemovedBackgroundPrintifyImageId,
    } = await selectAllFromImageWhereImageIdEquals(printifyImageId);

    if (existingRemovedBackgroundPrintifyImageId) {
        redirect(
            `/product/${existingRemovedBackgroundPrintifyImageId}?country=${country}`,
        );
    }

    const removedBackgroundImageBase64Contents =
        await removeBackgroundAndReturnBase64Image(printifyImageUrl);

    const {
        id: removedBackgroundPrintifyImageId,
        preview_url: removedBackgroundPrintifyImageUrl,
    } = await postBase64ImageToPrintify(
        removedBackgroundImageBase64Contents,
        "generatedImage.png",
    );

    await updateImageTableWithRemovedBackgroundImage({
        printifyImageId,
        removedBackgroundPrintifyImageId,
        removedBackgroundPrintifyImageUrl,
    });

    redirect(`/product/${removedBackgroundPrintifyImageId}?country=${country}`);
}
