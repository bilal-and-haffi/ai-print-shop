"use server";

import { Resend } from "resend";
import { OrderConfirmationEmailTemplate } from "@/components/OrderConfirmationEmailTemplate";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOrderConfirmationEmailParamsSchema = z.object({
    emailAddress: z.string(),
    firstName: z.string(),
    printifyConnectUrl: z.string(),
});

export async function sendOrderConfirmationEmail(
    emailAddress: string,
    firstName: string,
    printifyConnectUrl: string,
) {
    if (
        emailAddress === "do-not-send@ai-print-shop.com" ||
        emailAddress === "do-not-send-us@ai-print-shop.com"
    ) {
        console.log({ msg: "Not sending email", emailAddress });
        return;
    }
    try {
        sendOrderConfirmationEmailParamsSchema.parse({
            emailAddress,
            firstName,
            printifyConnectUrl,
        });

        console.log({
            msg: "sendOrderConfirmationEmail",
            emailAddress,
            firstName,
            printifyConnectUrl,
        });
        const { data, error } = await resend.emails.send({
            from: "AI Print Shop <no-reply@ai-print-shop.com>",
            to: emailAddress,
            subject: "Order Confirmation",
            react: OrderConfirmationEmailTemplate({
                firstName,
                printifyConnectUrl,
            }),
            text: "",
            reply_to: "customer-service@ai-print-shop.com",
        });
        console.log({ data, error });

        if (!data || !data.id) {
            console.error("Missing data");
            throw new Error("Missing data");
        }

        return data.id;
    } catch (error) {
        console.error({ error });
    }
}
