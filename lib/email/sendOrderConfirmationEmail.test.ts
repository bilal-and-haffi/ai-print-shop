import { sendOrderConfirmationEmail } from "./sendOrderConfirmationEmail";
import { Resend } from "resend";

// Mock Resend module
jest.mock("resend", () => ({
    Resend: jest.fn().mockImplementation(() => ({
        emails: {
            send: jest.fn(),
        },
    })),
}));

describe("sendOrderConfirmationEmail", () => {
    it("does not send email if email address is do-not-send@ai-print-shop.com", async () => {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const sendSpy = jest.spyOn(resend.emails, "send");

        await sendOrderConfirmationEmail(
            "do-not-send@ai-print-shop.com",
            "first-name",
            "fake.com",
        );

        // Expect email to not have been sent
        expect(sendSpy).not.toHaveBeenCalled();
    });
});
