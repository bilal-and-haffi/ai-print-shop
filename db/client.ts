import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { envServer } from "@/lib/env/server";

const sql = neon(envServer.DATABASE_URL);
export const dbClient = drizzle(sql);
