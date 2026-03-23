import{test} from '@playwright/test';
import {LoginPage} from '../pages/login.js';
import {ImageUpload} from '../pages/image_upload_activity.js';
import workshopData from '../data/workshopData.json';

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

for (let i = 0; i < 5; i++) {
test("Add workshop " + (i + 1), async ({page}) => {

    const randomTitle = getRandomItem(workshopData.workshopTitles);
    const randomDescription = getRandomItem(workshopData.workshopDescriptions);
    const randomAccessType = getRandomItem(workshopData.accessType);

    // login
    const loginPage = new LoginPage(page);
    await loginPage.login();
    await page.waitForTimeout(2000);
    await page.pause();

    // navigate to workshop
    await page.goto(process.env.URL + 'admin/activities');
    await page.getByRole('button', {name: 'View Workshop'}).click();
    await page.getByRole('button', {name: 'Create New Workshop'}).click();

    // fill title
    await page.getByRole('textbox', {name: 'Workshop Title'}).fill(randomTitle);

    // fill description
    await page.getByRole('textbox', {name: 'Workshop Description'}).fill(randomDescription);

    // upload cover image
    const coverUpload = new ImageUpload(page);
    await coverUpload.uploadRandomImage();

    // drive link
    await page.getByRole('textbox', { name: 'External URL (Drive/Docs/Other)(Optional)' }).fill(workshopData.externalURL);

    // workshop access type
    await page.getByRole('button', {name: randomAccessType}).click();

    // submit
    await page.getByRole('button', {name: 'Create New Workshop'}).click();

    await page.waitForTimeout(2000);
    });
}