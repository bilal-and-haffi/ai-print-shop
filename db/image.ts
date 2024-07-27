"use server";
import { dbClient } from "@/db/client";
import { imageTable } from "@/db/schema";
import { eq } from "drizzle-orm";

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

export const getPromptFromImageId = async (printifyImageId: string) => {
    console.log({ msg: "Getting prompt from image id", printifyImageId });
    const selectResult = await dbClient
        .select()
        .from(imageTable)
        .where(eq(imageTable.printifyImageId, printifyImageId));
    return selectResult[0].prompt;
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
