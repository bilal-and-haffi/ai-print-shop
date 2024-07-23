import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/create");
    await page.getByPlaceholder("Example: An astronaut playing").click();
    await page.getByPlaceholder("Example: An astronaut playing").fill("bird");
});

test.skip("User can select None for location and style and this should mean that the prompt is not concatenated", async ({
    page,
}) => {
    await page.locator("button").filter({ hasText: "Style: None" }).click();
    await page.getByLabel("Style: None").click();
    await page.locator("button").filter({ hasText: "Location: None" }).click();
    await page.getByLabel("Location: None").click();
    await page.getByTestId("Generate Image Button").click();
    await page.waitForURL(/product/);
});

test.skip("User can select pixel art for style and generate an image", async ({
    page,
}) => {
    await page.locator("button").filter({ hasText: "Style: None" }).click();
    await page.getByLabel("Style: Pixel Art").click();
    await page.locator("button").filter({ hasText: "Location: None" }).click();
    await page.getByLabel("Location: None").click();
    await page.getByTestId("Generate Image Button").click();
    await page.waitForURL(/product/);
});
