import { defineConfig } from "drizzle-kit";
import { config as dotEndConfig } from "dotenv";

dotEndConfig({
  path: "./.env.development.local",
});

export default defineConfig({
  schema: "./db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL as string,
  },
  verbose: true,
  strict: true,
});
