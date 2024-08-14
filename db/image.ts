"use server";
import { dbClient } from "@/db/client";
import { imageTable } from "@/db/schema";
import { eq, or } from "drizzle-orm";

type ImageInsert = typeof imageTable.$inferInsert;
type ImageSelect = typeof imageTable.$inferSelect;

export const addToImageTable = async ({
    prompt,
    printifyImageId,
    printifyImageUrl,
}: ImageInsert) => {
    if (!printifyImageId) {
        console.error({ printifyImageId, msg: "printify image id missing???" });
    }
    const insertResult = await dbClient
        .insert(imageTable)
        .values({ prompt, printifyImageId, printifyImageUrl })
        .returning({ id: imageTable.id });
    return insertResult[0].id;
};

export const updateImageTableWithPrintifyImageId = async ({
    printifyImageId,
    printifyProductId,
}: {
    printifyImageId: string;
    printifyProductId: string;
}) => {
    console.log({
        msg: "Adding printify image id to image table",
        printifyImageId,
        printifyProductId,
    });

    await dbClient
        .update(imageTable)
        .set({
            printifyProductId,
        })
        .where(eq(imageTable.printifyImageId, printifyImageId));
};

export const updateImageTableWithRemovedBackgroundImage = async ({
    printifyImageId,
    removedBackgroundPrintifyImageId,
    removedBackgroundPrintifyImageUrl,
}: {
    printifyImageId: string;
    removedBackgroundPrintifyImageId: string;
    removedBackgroundPrintifyImageUrl: string;
}) => {
    console.log({
        msg: "Adding background image to image table",
        printifyImageId,
        removedBackgroundPrintifyImageId,
        removedBackgroundPrintifyImageUrl,
    });
    const updateResult = await dbClient
        .update(imageTable)
        .set({
            removedBackgroundPrintifyImageId,
            removedBackgroundPrintifyImageUrl,
        })
        .where(eq(imageTable.printifyImageId, printifyImageId));
    return updateResult;
};

export const getPromptFromImageIdOrRemovedBackgroundImageId = async (
    printifyImageId: string,
) => {
    console.log({ msg: "Getting prompt from image id", printifyImageId });
    const selectResult = await dbClient
        .select()
        .from(imageTable)
        .where(
            or(
                eq(imageTable.printifyImageId, printifyImageId),
                eq(
                    imageTable.removedBackgroundPrintifyImageId,
                    printifyImageId,
                ),
            ),
        );
    const { prompt } = selectResult[0];
    console.info({ msg: "Found prompt", prompt });
    return prompt;
};

export const selectAllFromImageWhereImageIdEquals = async (
    printifyImageId: string,
): Promise<ImageSelect> => {
    console.log({
        msg: "Selecting all from image where image id equals",
        printifyImageId,
    });
    const selectResult = await dbClient
        .select()
        .from(imageTable)
        .where(eq(imageTable.printifyImageId, printifyImageId));
    return selectResult[0];
};

export const selectAllFromImageWhereRemovedBackgroundImageIdEquals = async (
    removedBackgroundImageId: string,
): Promise<ImageSelect> => {
    console.log({
        msg: "Selecting all from image where removedBackgroundImageId equals",
        removedBackgroundImageId,
    });
    const selectResult = await dbClient
        .select()
        .from(imageTable)
        .where(
            eq(
                imageTable.removedBackgroundPrintifyImageId,
                removedBackgroundImageId,
            ),
        );
    return selectResult[0];
};

export const selectAllFromImageWhereImageIdOrRemovedBackgroundImageIdEquals =
    async (imageId: string): Promise<ImageSelect> => {
        console.log({
            msg: "Selecting all from image where removedBackgroundImageId equals",
            imageId,
        });
        const selectResult = await dbClient
            .select()
            .from(imageTable)
            .where(
                or(
                    eq(imageTable.removedBackgroundPrintifyImageId, imageId),
                    eq(imageTable.printifyImageId, imageId),
                ),
            );
        return selectResult[0];
    };
