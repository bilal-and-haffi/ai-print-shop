"use server";
import { envServer } from "@/lib/env/server";

export async function convertUSDToGBP(usd: number) {
    if (envServer.CI || envServer.VERCEL_ENV !== "production") {
        return 0.79; // added for monthly rate limit
    }
    const endpoint = `https://api.freecurrencyapi.com/v1/latest?apikey=${envServer.FREE_CURRENCY_API_KEY}&currencies=USD&base_currency=GBP`;
    const response = await fetch(endpoint, {
        cache: "force-cache",
    });
    const data = await response.json();
    const { USD } = data.data;
    const gbpInUsd = USD;
    const gbp = usd / gbpInUsd;

    return gbp;
}
