import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Get started" }).click();
    await page.getByPlaceholder("Example: An astronaut playing").click();
    await page
        .getByPlaceholder("Example: An astronaut playing")
        .fill("test prompt");
    await page.getByTestId("Generate Image Button").click();
});

test.describe("product page", () => {
    test("Refresh button creates another image with the same prompt", async ({
        page,
    }) => {
        await page
            .getByTestId("Generate new image with same prompt button")
            .click();
        await page
            .getByTestId("Generate new image with same prompt button")
            .click();
        expect(await page.waitForURL(/test%20prompt/));
        expect(await page.waitForURL(/product/));
    });
});
