"use server";
import { dbClient } from "@/db/client";
import { promptTable } from "@/db/schema";
import { eq } from "drizzle-orm";

type PromptInsert = typeof promptTable.$inferInsert;

export const addToPromptTable = async ({ prompt }: PromptInsert) => {
    const insertResult = await dbClient
        .insert(promptTable)
        .values({ prompt })
        .returning({ id: promptTable.id });
    return insertResult[0].id;
};
