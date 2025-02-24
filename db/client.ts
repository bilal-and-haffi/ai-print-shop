import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "dotenv/config";
import { envServer } from "@/lib/env/server";

const connectionString = envServer.DATABASE_URL;
export const client = postgres(connectionString, { prepare: false });
const dbClient = drizzle(client);
export { dbClient };
