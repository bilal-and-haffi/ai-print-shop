import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/AI Personalised Gift Shop/);
});

test("should allow user to switch between products", async ({ page }) => {
    await page.goto("/");
    // in test env we will already have "test" in the input field and that is mocked
    const generateButton = await page.getByText("Generate");
    await generateButton.click();
    await expect(page).toHaveURL(/\/tshirt/);

    const tShirtDescription = await page.getByText("unisex heavy cotton tee");
    expect(tShirtDescription).toBeVisible();

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
    const hoodieDescription = await page.getByText(
        "unisex heavy blend hooded sweatshirt",
    );
    await expect(hoodieDescription).toBeVisible();
    await expect(tShirtButton).not.toHaveClass(/ring-white/);
    await expect(hoodieButton).toHaveClass(/ring-white/);
    await expect(mugButton).not.toHaveClass(/ring-white/);

    // check if can go to mug product
    await mugButton.click();
    const mugDescription = await page.getByText(
        "Choose from seven bold accent colors and customize these two-tone mugs with your original designs.",
    );
    await expect(mugDescription).toBeVisible();
    await expect(tShirtButton).not.toHaveClass(/ring-white/);
    await expect(hoodieButton).not.toHaveClass(/ring-white/);
    await expect(mugButton).toHaveClass(/ring-white/);
});
