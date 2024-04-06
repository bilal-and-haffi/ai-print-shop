import { dbClient } from "@/db/client";
import { imageTable } from "@/db/schema";

export const getExampleTable = async () => {
  const selectResult = await dbClient.select().from(imageTable);
  console.log("Results", selectResult);
};
