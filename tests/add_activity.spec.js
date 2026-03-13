import {expect, test} from '@playwright/test';
import activityData from '../Data/activityData.json' assert {type: 'json' };
import { ImageUpload } from '../pages/image_upload_activity';
// import {getRandomItem} from '../helpers/randomFuntion';
import { LoginPage } from '../pages/login';
test.setTimeout(30000);

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

for (let i = 0; i < 3; i++) {
    test("Add activity " + (i + 1), async ({page}) => {
        const randomTitle = getRandomItem(activityData.activityTitles);
        const randomType = getRandomItem(activityData.activityTypes);
        const randomAgeRange = getRandomItem(activityData.ageRanges);
        const randomDescription = getRandomItem(activityData.activityDescriptions);
        const randomYoutubeLink = getRandomItem(activityData.youtubeLinks);
        const randomAccessType = getRandomItem(activityData.accessType);

        // login
        const loginPage = new LoginPage(page);
        await loginPage.login();
        await page.waitForTimeout(2000);

        // navigate to activities
        await page.goto(process.env.URL + 'admin/activities');
        await page.getByRole('button', {name: 'Create Activity'}).click();
        await page.getByRole('textbox', {name: 'Activity Title'}).fill(randomTitle);

        // select category
        await page.getByRole('button', { name: 'Choose category' }).click();
        await page.getByRole('menuitem', {name: randomType}).click();
        await page.mouse.click(0, 0);

        // select age range
        await page.getByRole('button', {name: 'Select age range'}).click();
        await page.getByRole('menuitem', {name: randomAgeRange}).click();

        // fill description
        await page.getByRole('textbox', {name: 'Activity Description'}).fill(randomDescription);

        // add media
        const coverUpload = new ImageUpload(page);
        await coverUpload.uploadRandomImage();
        // await page.waitForTimeout(5000);

        // fill youtube link
        await page.locator("//input[@placeholder='https://youtube.com/watch?v=...']").fill(randomYoutubeLink);

        // activity access type
        await page.getByRole('button', {name: randomAccessType}).click();

        const allSteps = [
            ...activityData.steps1,
            ...activityData.steps2,
            ...activityData.steps3
        ];

        allSteps.sort(() => Math.random() - 0.5);

        // Random number of steps
        const n = Math.floor(Math.random() * 6) + 1;
        await page.getByPlaceholder('First magical step...').waitFor();

        for (let i = 0; i < n; i++) {
            if (i === 0) {
                await page.getByPlaceholder('First magical step...')
                    .fill(allSteps[i]);
            } else if (i === 1) {
                await page.getByPlaceholder('Second wonderful step...')
                    .fill(allSteps[i]);
            } else {
                await page.getByRole('button', { name: '+ Add Another Step' }).click();
                const stepName = `Step ${i + 1}`;
                await page.getByPlaceholder(stepName).waitFor();
                await page.getByPlaceholder(stepName).fill(allSteps[i]);
            }
        }   

        await page.waitForTimeout(4000);
        expect(page.getByRole('button', {name: 'Create Activity'})).toBeVisible();
        await page.getByRole('button', {name: 'Create Activity'}).click();
        
        // Wait for activity to be published - adjust based on your app's behavior:
        // Option 1: Wait for URL change to activities list
        await page.waitForURL('**/admin/activities', { timeout: 10000 });
        
        // Option 2: Or wait for success message (uncomment if applicable)
        // await expect(page.locator('text=/successfully|created|published/i')).toBeVisible({ timeout: 10000 });
        
        // Option 3: Or wait for navigation away from create page
        // await page.waitForURL(url => !url.includes('/create'), { timeout: 10000 });
        
        await page.waitForTimeout(2000); // Additional wait for backend processing
    });
}