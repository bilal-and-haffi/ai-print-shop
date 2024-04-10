import { defineConfig } from "drizzle-kit";
import { config as dotEnvConfig } from "dotenv";

dotEnvConfig({
    path: process.env.CI ? "./.env.ci" : "./.env.development.local",
});

export default defineConfig({
    schema: "./db/schema.ts",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL as string,
    },
    verbose: true,
    strict: process.env.CI ? false : true,
});
