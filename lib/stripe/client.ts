import Stripe from "stripe";
import { envServer } from "@/lib/env/server";

export const stripeServerClient = new Stripe(
    envServer.STRIPE_SECRET_KEY as string,
    {
        apiVersion: "2023-10-16",
        typescript: true,
    },
);
