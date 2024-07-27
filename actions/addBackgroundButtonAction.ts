"use server";

import { selectAllFromImageWhereRemovedBackgroundImageIdEquals } from "@/db/image";
import { redirect } from "next/navigation";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";

export async function addBackgroundButtonAction({
    printifyImageId,
    country,
}: {
    printifyImageId: string;
    country: CountryCode;
}) {
    const originalPrintifyImageId = (
        await selectAllFromImageWhereRemovedBackgroundImageIdEquals(
            printifyImageId,
        )
    ).printifyImageId;

    if (!originalPrintifyImageId) {
        console.warn("no originalPrintifyImageId", { printifyImageId });
    }

    redirect(`/product/${originalPrintifyImageId}?country=${country}`);
}
