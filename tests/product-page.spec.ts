import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const input = await page.getByRole("textbox");
    await input.fill("test prompt"); // hard coded to return image without making request
    const generateButton = await page.getByTestId("Generate Image Button");
    await generateButton.click();
});

test("should not have invalid model text", async ({ page }) => {
    await page.waitForTimeout(1000);
    await expect(page.getByText("Invalid model")).not.toBeVisible({});
});

test.skip('should have url "/product"', async ({ page }) => {
    await expect(page).toHaveURL(/\/product/, { timeout: 30000 });
});
