import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveScreenshot("landing.png");

    await page.selectOption("form > div > select", "openai");

    const input = page.getByRole("textbox");
    await input.fill("test prompt"); // hard coded to return image without making request
    const generateButton = page.getByTestId("Generate Image Button");
    await generateButton.click();
});

test("", async ({ page }) => {
    await page.screenshot({ path: "tests/screenshots/x.png" });
});
