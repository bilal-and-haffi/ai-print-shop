"use client";
import { z } from "zod";

const envSchema = z.object({
    NEXT_PUBLIC_ENV: z
        .union([
            z.literal("development"),
            z.literal("testing"),
            z.literal("production"),
        ])
        .default("production"),
});

export const envClient = envSchema.parse({
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
});
