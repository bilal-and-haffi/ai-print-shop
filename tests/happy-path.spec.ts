import { getEnabledProductsForCountry } from "@/lib/printify/productsData";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import { test, expect, Page } from "@playwright/test";

test.describe("happy path GB", () => {
    const countryCode = "GB";
    test.beforeEach(async ({ page }) => {
        await page.route("https://ipapi.co/json/", async (route) => {
            const json = { country: countryCode };
            await route.fulfill({ json });
        }); // mock because CI on github runs in US and the link delivery address is in uk so it fails
        await page.goto("/");
        await page.getByRole("button", { name: "Get started" }).click();
        await page.getByPlaceholder("Example: An astronaut playing").click();
        await page
            .getByPlaceholder("Example: An astronaut playing")
            .fill("test prompt");
        await page.getByTestId("Generate Image Button").click();
        await page.getByTestId("Continue Button").click();
        await page.waitForURL(/image/);
        await page.getByRole("button", { name: "Continue" }).click();
    });

    for (const product of getEnabledProductsForCountry("GB")) {
        const { displayName } = product;
        test(`buy a ${displayName}`, async ({ page }) => {
            await page.getByRole("button", { name: "Buy now" }).click();
            await page.locator("#product-links").getByRole("combobox").click();
            await page.getByLabel(displayName).click();
            await doStripeForm({ page, countryCode });
            await page.waitForURL(/success/);
            await expect(
                page.getByRole("heading", {
                    name: "Your order has been confirmed!",
                }),
            ).toBeVisible();
        });
    }
});

test.describe("happy path us", () => {
    const countryCode = "US";
    test.beforeEach(async ({ page }) => {
        await page.route("https://ipapi.co/json/", async (route) => {
            const json = { country: countryCode };
            await route.fulfill({ json });
        });

        await page.goto("/");
        await page.getByRole("button", { name: "Get started" }).click();
        await page.getByPlaceholder("Example: An astronaut playing").click();
        await page
            .getByPlaceholder("Example: An astronaut playing")
            .fill("test prompt");
        await page.getByTestId("Generate Image Button").click();
        await page.getByTestId("Continue Button").click();
    });

    for (const product of getEnabledProductsForCountry("US")) {
        const { displayName } = product;
        test(`US - buy a ${displayName}`, async ({ page }) => {
            await page.getByRole("button", { name: "Buy now" }).click();
            await page.locator("#product-links").getByRole("combobox").click();
            await page.getByLabel(displayName).click();
            await doStripeForm({ page, countryCode });
            await page.waitForURL(/success/);
            await expect(
                page.getByRole("heading", {
                    name: "Your order has been confirmed!",
                }),
            ).toBeVisible();
        });
    }
});

async function doStripeForm({
    page,
    countryCode,
}: {
    page: Page;
    countryCode: CountryCode;
}) {
    const emailAddress =
        countryCode === "US"
            ? "do-not-send-us@ai-print-shop.com"
            : "do-not-send@ai-print-shop.com";

    await page.getByLabel("Email").click();
    await page.getByLabel("Email").fill(emailAddress);
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
}
