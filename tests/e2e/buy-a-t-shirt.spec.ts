import { test, expect } from "@playwright/test";

test("buy a t shirt", async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("Example: An astronaut playing").click();
    await page
        .getByPlaceholder("Example: An astronaut playing")
        .fill("test prompt");
    await page.getByTestId("Generate Image Button").click();
    await page.getByRole("button", { name: "Buy now" }).click();
    await page.getByLabel("Email").click();
    await page.getByLabel("Email").fill("bilalm354@gmail.com");
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
    ).toBeVisible({ timeout: 10000 });
});
