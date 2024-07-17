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

test('should have url "/product"', async ({ page }) => {
    await expect(page).toHaveURL(/\/product/, { timeout: 30000 });
});

test.skip("should allow user to switch between products", async ({ page }) => {
    // get buttons
    const tShirtButton = page.getByRole("button", { name: "T Shirt" });
    const hoodieButton = page.getByRole("button", { name: "Hoodie" });
    const mugButton = page.getByRole("button", { name: "Mug" });

    // Check if the product buttons are visible
    await expect(tShirtButton).toBeVisible({ timeout: 10000 });
    await expect(hoodieButton).toBeVisible({ timeout: 10000 });
    await expect(mugButton).toBeVisible({ timeout: 10000 });

    // check if can go to hoodie product
    await hoodieButton.click();
    await expect(tShirtButton).not.toHaveClass(/ring-white/);
    await expect(hoodieButton).toHaveClass(/ring-white/);
    await expect(mugButton).not.toHaveClass(/ring-white/);

    // check if can go to mug product
    await mugButton.click();
    await expect(tShirtButton).not.toHaveClass(/ring-white/);
    await expect(hoodieButton).not.toHaveClass(/ring-white/);
    await expect(mugButton).toHaveClass(/ring-white/);
});
