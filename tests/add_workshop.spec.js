import{test,expect} from '@playwright/test';
import {LoginPage} from '../pages/login.js';

test("Add workshop", async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login();

    });