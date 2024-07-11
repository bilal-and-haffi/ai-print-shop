"use server";
import { dbClient } from "@/db/client";
import { imageTable } from "@/db/schema";
import { eq } from "drizzle-orm";

type ImageInsert = typeof imageTable.$inferInsert;

export const addToImageTable = async ({ imageUrl, promptId }: ImageInsert) => {
    await dbClient.insert(imageTable).values({ imageUrl, promptId });
};

export const getAllImageUrlsForPromptId = async (promptId: number) => {
    const selectResult = await dbClient
        .select({ url: imageTable.imageUrl })
        .from(imageTable)
        .where(eq(imageTable.promptId, promptId));
    return selectResult.map((x) => x.url);
};
