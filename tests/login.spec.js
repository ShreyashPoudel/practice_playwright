import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
import { LoginPage } from '../pages/login';

test("Login test", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login();

    // Wait for a success message or element that confirms login
    const url = page.url();
    expect(url).toContain('growli'); // <-- important assertion

    await page.waitForTimeout(2000);
});