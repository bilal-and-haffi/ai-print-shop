import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/create");
});

test("User can select None for location and style and this should mean that the prompt is not concatenated", async ({
    page,
}) => {
    await page.getByPlaceholder("Example: An astronaut playing").click();
    await page.getByPlaceholder("Example: An astronaut playing").fill("bird");
    await page
        .locator("button")
        .filter({ hasText: "Style: Photograph" })
        .click();
    await page.getByLabel("Style: None").click();
    await page.locator("button").filter({ hasText: "Location: Space" }).click();
    await page.getByLabel("Location: None").click();
    await page.getByTestId("Generate Image Button").click();
    await page.waitForURL(/product/);
});
