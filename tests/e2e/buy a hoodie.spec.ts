import { test, expect } from "@playwright/test";

test("buy a hoodie", async ({ page }) => {
    await page.route("https://ipapi.co/json/", async (route) => {
        const json = { country: "GB" };
        await route.fulfill({ json });
    }); // mock because CI on github runs in US and the link delivery address is in uk so it fails
    await page.goto("/");
    await page.getByRole("button", { name: "Get started" }).click();
    await page.getByPlaceholder("Example: An astronaut playing").click();
    await page
        .getByPlaceholder("Example: An astronaut playing")
        .fill("test prompt");
    await page.getByTestId("Generate Image Button").click();
    await page.getByRole("button", { name: "Hoodie" }).click();
    await page.getByRole("button", { name: "Buy now" }).click();
    await page.getByLabel("Email").click();
    await page.getByLabel("Email").fill("do-not-send@ai-print-shop.com");
    await page.getByTestId("sms-code-input-0").fill("0");
    await page.getByTestId("sms-code-input-1").fill("0");
    await page.getByTestId("sms-code-input-2").fill("0");
    await page.getByTestId("sms-code-input-3").fill("0");
    await page.getByTestId("sms-code-input-4").fill("0");
    await page.getByTestId("sms-code-input-5").fill("0");
    await page.waitForTimeout(5000);
    await page
        .getByTestId("hosted-payment-submit-button")
        .click({ force: true });
    await page.waitForURL(/success/);
    await expect(
        page.getByRole("heading", { name: "Your order has been confirmed!" }),
    ).toBeVisible();
});
