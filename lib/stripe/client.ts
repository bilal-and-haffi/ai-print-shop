import Stripe from "stripe";

export const stripeServerClient = new Stripe(
  process.env.STRIPE_SECRET_KEY as string,
  {
    apiVersion: "2023-10-16",
    typescript: true,
  },
);
