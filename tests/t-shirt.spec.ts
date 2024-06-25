import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/AI Personalised Gift Shop/);
});

test("shows email address", async ({ page }) => {
    await page.goto("/");
    const emailButton = await page.getByText("ai-personalised-gifts@mail.com");
    await expect(emailButton).toBeVisible();
});

test("should allow user to switch between products", async ({ page }) => {
    await page.goto("/");

    // select model
    await page.selectOption("#form-container > form > div > select", "openai");

    // in test env we will already have "test" in the input field and that is mocked
    const input = await page.getByRole("textbox");
    await input.fill("test prompt");
    const generateButton = await page.getByText("Generate");
    await generateButton.click();
    await expect(page).toHaveURL(/\/product/);

    // get buttons
    const tShirtButton = await page.getByText("T Shirt");
    const hoodieButton = await page.getByText("Hoodie");
    const mugButton = await page.getByRole("button", { name: "Mug" });

    // Check if the product buttons are visible
    await expect(tShirtButton).toBeVisible();
    await expect(hoodieButton).toBeVisible();
    await expect(mugButton).toBeVisible();

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

    // should be able to change colours

    // should be able to change sizes

    // should be able to checkout

    // submitted order should be correct
});
