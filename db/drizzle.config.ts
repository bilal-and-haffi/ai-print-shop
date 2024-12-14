import { defineConfig } from "drizzle-kit";
import { envServer } from "@/lib/env/server";

export default defineConfig({
    schema: "./db/schema.ts",
    dialect: "sqlite",
    dbCredentials: {
        url: "./sqlite.db",
    },
    verbose: true,
    strict: envServer.CI ? false : true,
});
