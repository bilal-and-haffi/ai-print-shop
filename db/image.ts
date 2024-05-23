"use server";
import { dbClient } from "@/db/client";
import { imageTable } from "@/db/schema";
import { eq } from "drizzle-orm";

type ImageInsert = typeof imageTable.$inferInsert;
export const addToImageTable = async ({
    prompt,
    printifyImageId,
    printifyImageUrl,
}: ImageInsert) => {
    const insertResult = await dbClient
        .insert(imageTable)
        .values({ prompt, printifyImageId, printifyImageUrl })
        .returning({ id: imageTable.id });
    return insertResult[0].id;
};

export const getPromptFromImageId = async (printifyImageId: string) => {
    const selectResult = await dbClient
        .select()
        .from(imageTable)
        .where(eq(imageTable.printifyImageId, printifyImageId));
    return selectResult[0].prompt;
};
