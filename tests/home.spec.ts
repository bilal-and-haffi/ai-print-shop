import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/AI Print Shop/);
});

test("shows email address", async ({ page }) => {
    await page.goto("/");
    const emailButton = await page.getByText("ai-print-shop@mail.com");
    await expect(emailButton).toBeVisible();
});