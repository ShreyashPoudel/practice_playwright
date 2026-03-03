import {test} from '@playwright/test';
import activityData from '../Data/activityData.json';
import { ImageUpload } from '../pages/image_upload_activity';
import { LoginPage } from '../pages/login';
test.setTimeout(30000);

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

for (let i = 0; i < 4; i++) {
    test("Add activity " + (i + 1), async ({page}) => {
        const randomTitle = getRandomItem(activityData.activityTitles);
        const randomType = getRandomItem(activityData.activityTypes);
        const randomAgeRange = getRandomItem(activityData.ageRanges);
        const randomDescription = getRandomItem(activityData.activityDescriptions);
        const randomYoutubeLink = getRandomItem(activityData.youtubeLinks);
        const randomStep1 = getRandomItem(activityData.steps1);
        const randomStep2 = getRandomItem(activityData.steps2);
        const randomStep3 = getRandomItem(activityData.steps3);

        // login
        const loginPage = new LoginPage(page);
        await loginPage.login();

        await page.waitForTimeout(3000);

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

        // fill youtube link
        await page.locator("//input[@placeholder='https://youtube.com/watch?v=...']").fill(randomYoutubeLink);

        // // fill duration
        // const duration = page.getByRole('spinbutton', {name: 'Duration (minutes)'});
        // duration.click();
        // await page.keyboard.press('Backspace');
        // await duration.fill('30');

        // // fill steps
        // await page.getByRole('textbox', {name: 'First magical step...'}).fill(randomStep1);
        // await page.getByRole('textbox', {name: 'Second wonderful step...'}).fill(randomStep2);
        // await page.getByRole('button', {name: '+ Add Another Step'}).click();
        // await page.getByRole('textbox', {name: 'Step 3'}).fill(randomStep3);
        // add random activity steps


// Helper to get random item (optional if needed elsewhere)
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Merge all step arrays
const allSteps = [
  ...activityData.steps1,
  ...activityData.steps2,
  ...activityData.steps3
];

// Shuffle steps
allSteps.sort(() => Math.random() - 0.5);

// Random number of steps (1 to 6)
const n = Math.floor(Math.random() * 6) + 1;

// Wait for first textbox to appear
await page.getByPlaceholder('First magical step...').waitFor();

for (let i = 0; i < n; i++) {

  if (i === 0) {
    await page.getByPlaceholder('First magical step...')
      .fill(allSteps[i]);

  } else if (i === 1) {
    await page.getByPlaceholder('Second wonderful step...')
      .fill(allSteps[i]);

  } else {
    // Click button to add new step field
    await page.getByRole('button', { name: '+ Add Another Step' }).click();

    const stepName = `Step ${i + 1}`;

    await page.getByPlaceholder(stepName).waitFor();
    await page.getByPlaceholder(stepName).fill(allSteps[i]);
  }
}
        
        await page.getByRole('button', {name: 'Create Activity'}).click();

        await page.waitForTimeout(5000);
});
}