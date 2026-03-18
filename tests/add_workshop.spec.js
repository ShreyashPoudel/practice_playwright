import{test,expect} from '@playwright/test';
import {LoginPage} from '../pages/login.js';

test("Add workshop", async ({page}) => {
    
    // login
    const loginPage = new LoginPage(page);
    await loginPage.login();
    await page.waitForTimeout(2000);

    // navigate to activities
    await page.goto(process.env.URL + 'admin/activities');
    await page.getByRole('button', {name: 'Create Activity'}).click();

    await page.getByRole('button', {name: 'View Workshop'}).click();
    await page.getByRole('button', {name: 'Create New Workshop'}).click();

    });