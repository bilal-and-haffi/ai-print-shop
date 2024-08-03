import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/support");
});

test("Lets user submit feedback without an email address", async ({ page }) => {
    await page.getByPlaceholder("Enter your message here...").click();
    await page
        .getByPlaceholder("Enter your message here...")
        .fill("feedback with no email address entered just body");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(
        page.getByText("Feedback sent :)", { exact: true }),
    ).toBeVisible();
});

test("Lets user submit feedback with an email address", async ({ page }) => {
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill("do-not-send@ai-print-shop.com");
    await page.getByPlaceholder("Enter your message here...").click();
    await page
        .getByPlaceholder("Enter your message here...")
        .fill("feedback with no email address entered just body");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(
        page.getByText("Feedback sent :)", { exact: true }),
    ).toBeVisible();
});
