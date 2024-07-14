"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendFeebackEmailToBilalSchema = z.object({
    emailAddress: z.string(),
    body: z.string(),
});

export async function sendFeedbackEmail(emailAddress: string, body: string) {
    try {
        sendFeebackEmailToBilalSchema.parse({
            emailAddress,
            body,
        });

        console.log({
            msg: "sendFeedbackEmail",
            emailAddress,
            body,
        });
        const { data, error } = await resend.emails.send({
            from: "AI Print Shop <no-reply@ai-print-shop.com>",
            to: "feedback@ai-print-shop.com",
            subject: "Feedback",
            text: body,
            reply_to: emailAddress,
        });
        console.log({ data, error });

        if (!data || !data.id) {
            console.error("Missing data");
            throw new Error("Missing data");
        }

        return data.id;
    } catch (error) {
        console.error({ error });
        throw error;
    }
}
