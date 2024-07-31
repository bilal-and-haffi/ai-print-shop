import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Get started" }).click();
    await page.getByPlaceholder("Example: An astronaut playing").click();
    await page
        .getByPlaceholder("Example: An astronaut playing")
        .fill("test prompt");
    await page.getByTestId("Generate Image Button").click();
    await page.getByTestId("Continue Button").click();
});

test.describe("product page", () => {
    test("Refresh button creates another image with the same prompt", async ({
        page,
    }) => {
        await page
            .getByTestId("Generate new image with same prompt button")
            .click();
        expect(await page.waitForURL(/test%20prompt/));
        expect(await page.waitForURL(/product/));
    });

    test.describe("Customise menu", () => {
        test.beforeEach(async ({ page }) => {
            await page.getByRole("button", { name: "Customise" }).click();

            // maybe all below should be unit tests
            test("Toggle image background works", async ({ page }) => {
                await page
                    .getByRole("button", { name: "Toggle Image Background" })
                    .click();
                await page.waitForTimeout(2000);
                await expect(
                    page.getByText("Sorry, something went wrong."),
                ).not.toBeVisible();
            });

            test("Image position to front works", async ({ page }) => {
                await page
                    .getByRole("button", { name: "Position Image on Front" })
                    .click();
                await page.waitForTimeout(2000);
                await expect(
                    page.getByText("Sorry, something went wrong."),
                ).not.toBeVisible();
                expect(true).toBe(false);
            });

            test("Image position to back works", async ({ page }) => {
                await page
                    .getByRole("button", { name: "Position Image on Back" })
                    .click();
                await page.waitForTimeout(2000);
                await expect(
                    page.getByText("Sorry, something went wrong."),
                ).not.toBeVisible();
                expect(true).toBe(false);
                expect(true).toBe(false);
            });
        });
    });
});
