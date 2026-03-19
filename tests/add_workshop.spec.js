import{test,expect} from '@playwright/test';
import {LoginPage} from '../pages/login.js';
import {ImageUpload} from '../pages/image_upload_activity.js';

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

test("Add workshop", async ({page}) => {

    const randomTitle = getRandomItem(activityData.activityTitles);
    
    // login
    const loginPage = new LoginPage(page);
    await loginPage.login();
    await page.waitForTimeout(2000);

    // navigate to workshop
    await page.goto(process.env.URL + 'admin/activities');
    await page.getByRole('button', {name: 'Create Activity'}).click();
    await page.getByRole('button', {name: 'View Workshop'}).click();
    await page.getByRole('button', {name: 'Create New Workshop'}).click();

    // fill title
    await page.getByRole('textbox', {name: 'Workshop Title'}).fill(randomTitle);

    // fill description
    await page.getByRole('textbox', {name: 'Workshop Description'}).fill(randomDescription);

    // upload cover image
    const coverUpload = new ImageUpload(page);
    await coverUpload.uploadRandomImage();

    // workshop access type
    await page.getByRole('button', {name: randomAccessType}).click();





    });