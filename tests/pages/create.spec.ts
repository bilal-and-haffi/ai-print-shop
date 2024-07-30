import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Get started" }).click();
});

test.describe("Additional Options", () => {
    test.beforeEach(async ({ page }) => {
        await page.getByPlaceholder("Example: An astronaut playing").click();
        await page
            .getByPlaceholder("Example: An astronaut playing")
            .fill("bird");
    });
    test("User can select None for location and style and this should mean that the prompt is not concatenated", async ({
        page,
    }) => {
        await page.getByTestId("Generate Image Button").click();
        await page.locator("button").filter({ hasText: "Style: None" }).click();
        await page.getByLabel("Style: None").click();
        await page
            .locator("button")
            .filter({ hasText: "Location: None" })
            .click();
        await page.getByLabel("Location: None").click();
        await page.getByTestId("Continue Button").click();
        await page.getByTestId("Continue Button").click();
        await page.waitForURL(/product/);
        await expect(
            page.getByRole("button", { name: "Buy now" }),
        ).toBeVisible();
    });

    test("User can select pixel art for style and generate an image", async ({
        page,
    }) => {
        await page.getByTestId("Generate Image Button").click();
        await page.locator("button").filter({ hasText: "Style: None" }).click();
        await page.getByLabel("Style: Pixel Art").click();
        await page
            .locator("button")
            .filter({ hasText: "Location: None" })
            .click();
        await page.getByLabel("Location: None").click();
        await page.getByTestId("Continue Button").click();
        await page.getByTestId("Continue Button").click();
        await page.waitForURL(/product/);
        await expect(
            page.getByRole("button", { name: "Buy now" }),
        ).toBeVisible();
    });
});

test("User can randomise their prompt", async ({ page }) => {
    await expect(
        page.getByPlaceholder("Example: An astronaut playing"),
    ).toHaveText("test prompt");
    await page.getByText("Randomise").click();
    await expect(
        page.getByPlaceholder("Example: An astronaut playing"),
    ).not.toBeEmpty();
    await expect(
        page.getByPlaceholder("Example: An astronaut playing"),
    ).not.toHaveText("test prompt");
});
