
import {test} from '@playwright/test';
import activityData from '../Data/activityData.json';
import  dotenv from 'dotenv';
dotenv.config();
test.setTimeout(30000);

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}


async function login(page) {
    await page.goto(process.env.URL);
    await page.getByRole('link', {name: 'Get Started'}).click();
    await page.getByRole('textbox', {name: 'Email Address'}).fill(process.env.EMAIL);
    await page.getByRole('textbox', {name: 'Password'}).fill(process.env.PASSWORD);
    await page.locator('button[type="submit"]').click();
}

for (let i = 0; i < 6; i++) {
    test("Add activity " + (i + 1), async ({page}) => {
        const randomTitle = getRandomItem(activityData.activityTitles);
        const randomType = getRandomItem(activityData.activityTypes);
        const randomAgeRange = getRandomItem(activityData.ageRanges);
        const randomDescription = getRandomItem(activityData.activityDescriptions);
        const randomYoutubeLink = getRandomItem(activityData.youtubeLinks);
        const randomStep1 = getRandomItem(activityData.steps1);
        const randomStep2 = getRandomItem(activityData.steps2);

        await login(page);

        await page.waitForTimeout(3000);

        await page.goto(process.env.URL + 'admin/activities');
        await page.getByRole('button', {name: 'Create New'}).click();
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

        // fill youtube link
        await page.locator("//input[@placeholder='https://youtube.com/watch?v=...']").fill(randomYoutubeLink);

        // fill duration
        const duration = page.getByRole('spinbutton', {name: 'Duration (minutes)'});
        duration.click();
        await page.keyboard.press('Backspace');
        await duration.fill('30');

        // fill steps
        await page.getByRole('textbox', {name: 'First magical step...'}).fill(randomStep1);
        await page.getByRole('textbox', {name: 'Second wonderful step...'}).fill(randomStep2);
        
        await page.getByRole('button', {name: 'Create Activity'}).click();

        await page.waitForTimeout(5000);
});
}