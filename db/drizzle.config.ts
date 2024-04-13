import { defineConfig } from "drizzle-kit";
import { envServer } from "@/lib/env/server";

export default defineConfig({
    schema: "./db/schema.ts",
    driver: "pg",
    dbCredentials: {
        connectionString: envServer.DATABASE_URL as string,
    },
    verbose: true,
    strict: envServer.CI ? false : true,
});
