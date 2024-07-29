"use server";

import {
    selectAllFromImageWhereImageIdOrRemovedBackgroundImageIdEquals,
    selectAllFromImageWhereRemovedBackgroundImageIdEquals,
    updateImageTableWithRemovedBackgroundImage,
} from "@/db/image";
import { removeBackgroundAndReturnBase64Image } from "./removeBackgroundAndReturnBase64Image";
import { redirect } from "next/navigation";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import { postBase64ImageToPrintify } from "@/lib/printify/postBase64ImageToPrintify";

export async function toggleImageBackgroundButtonAction({
    currentImageId,
    country,
}: {
    currentImageId: string;
    country: CountryCode;
}) {
    const {
        printifyImageId: existingPrintifyImageId,
        removedBackgroundPrintifyImageId:
            existingRemovedBackgroundPrintifyImageId,
        printifyImageUrl,
    } = await selectAllFromImageWhereImageIdOrRemovedBackgroundImageIdEquals(
        currentImageId,
    );

    if (existingPrintifyImageId === currentImageId) {
        if (existingRemovedBackgroundPrintifyImageId) {
            redirect(
                `/product/${existingRemovedBackgroundPrintifyImageId}?country=${country}`,
            );
        } else {
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
                printifyImageId: existingPrintifyImageId,
                removedBackgroundPrintifyImageId,
                removedBackgroundPrintifyImageUrl,
            });

            redirect(
                `/product/${removedBackgroundPrintifyImageId}?country=${country}`,
            );
        }
    } else if (currentImageId === existingRemovedBackgroundPrintifyImageId) {
        redirect(`/product/${existingPrintifyImageId}?country=${country}`);
    }
}
