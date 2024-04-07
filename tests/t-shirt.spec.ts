import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/AI Personalised Gift Shop/);
});

test("should allow user to buy a t shirt", async ({ page }) => {
    await page.goto("/");
    // in test env we will already have "test" in the input field and that is mocked
    const generateButton = await page.getByText("Generate");
    await generateButton.click();
    await expect(page).toHaveURL(/\/tshirt/);

    const tShirtButton = await page.getByText("T Shirt");
    await expect(tShirtButton).toBeVisible();

    const hoodieButton = await page.getByText("Hoodie");
    await expect(hoodieButton).toBeVisible();

    const mugButton = await page.getByText("Mug");
    await expect(mugButton).toBeVisible();

    const buyNowButton = await page.getByText("Buy now");
    await buyNowButton.click();

    await expect(page).toHaveURL(/\/checkout/);

    // TODO: complete checkout process

    // TODO: check if the order is created
});
