import { z } from "zod";
import { config as dotEnvConfig } from "dotenv";

dotEnvConfig({
    path: process.env.CI ? "./.env.ci" : "./.env.development.local",
});

const envSchema = z.object({
    AI_GIFTS_API_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
    DATABASE_URL_UNPOOLED: z.string().url(),
    FREE_CURRENCY_API_KEY: z.string(),
    OPENAI_API_KEY: z.string(),
    OPENAI_ORG_ID: z.string(),
    PRINTIFY_API_TOKEN: z.string(),
    SHOP_ID: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    CI: z.string().optional(),
    VERCEL_ENV: z
        .union([
            z.literal("development"),
            z.literal("testing"),
            z.literal("preview"),
            z.literal("production"),
        ])
        .default("development"),
});

export const envServer = envSchema.parse(process.env);
