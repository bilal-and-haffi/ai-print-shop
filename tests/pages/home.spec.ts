import { examples } from "@/components/sections/ExamplesSection";
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/AI Print Shop/);
});

test("shows email address", async ({ page }) => {
    const emailButton = await page.getByText(
        "customer-service@ai-print-shop.com",
    );
    await expect(emailButton).toBeVisible();
});

test("shows example number of browse products with this image buttons", async ({
    page,
}) => {
    const buttons = page.getByRole("button", {
        name: "Browse products with this",
    });
    await expect(buttons).toHaveCount(examples.length);
});
