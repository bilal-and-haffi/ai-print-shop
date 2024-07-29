"use server";
import { envServer } from "@/lib/env/server";

export async function convertGBPToUSD(gbp: number) {
    const endpoint = `https://api.freecurrencyapi.com/v1/latest?apikey=${envServer.FREE_CURRENCY_API_KEY}&currencies=USD&base_currency=GBP`;
    const response = await fetch(endpoint, { cache: "force-cache" });
    const data = await response.json();
    const { USD } = data.data;
    const usd = gbp * USD;

    return usd;
}
