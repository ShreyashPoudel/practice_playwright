import {test} from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
import { LoginPage } from '../pages/login';

test("Login test", async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login();

    await page.waitForTimeout(2000);
});