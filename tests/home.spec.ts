import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/AI Print Shop/);
});

test("shows email address", async ({ page }) => {
    const emailButton = await page.getByText("ai-print-shop@mail.com");
    await expect(emailButton).toBeVisible();
});
