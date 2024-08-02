"use server";

import { Resend } from "resend";
import { z } from "zod";
import { envServer } from "../env/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmailSchema = z.object({
    emailAddress: z.string(),
    body: z.string(),
});

export async function sendEmail({
    emailAddress,
    body,
    subject,
}: {
    emailAddress: string;
    body: string;
    subject: string;
}) {
    if (envServer.CI) {
        console.log("Skipping email sending on CI");
        return;
    }

    try {
        sendEmailSchema.parse({
            emailAddress,
            body,
        });

        console.log({
            msg: "sendEmail",
            emailAddress,
            body,
        });

        const { data, error } = await resend.emails.send({
            from: "AI Print Shop <no-reply@ai-print-shop.com>",
            to: emailAddress,
            subject,
            text: body,
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
        throw error;
    }
}
