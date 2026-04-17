import { test } from '@playwright/test';
import activityData from '../data/activityData.json';
import { LoginPage } from '../pages/login';
import { ActivityPage } from '../pages/activity';
import { ImageUpload } from '../helpers/upload';

test.setTimeout(30000);

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

for (let i = 0; i < 10; i++) {
  test(`Add activity ${i + 1}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login();

    const activityPage = new ActivityPage(page);
    const upload = new ImageUpload(page);

    const title = getRandomItem(activityData.activityTitles);
    const category = getRandomItem(activityData.activityTypes);
    const ageRange = getRandomItem(activityData.ageRanges);
    const description = getRandomItem(activityData.activityDescriptions);
    const youtubeLink = getRandomItem(activityData.youtubeLinks);
    const accessType = getRandomItem(activityData.accessType);

    const allSteps = [...activityData.steps1, ...activityData.steps2, ...activityData.steps3];
    allSteps.sort(() => Math.random() - 0.5);
    const steps = allSteps.slice(0, Math.floor(Math.random() * 6) + 1);

    await activityPage.goto();
    await activityPage.clickCreate();
    await activityPage.titleInput.fill(title);
    await activityPage.chooseCategoryBtn.click();
    await page.getByRole('menuitem', { name: category }).click();
    await page.mouse.click(0, 0);
    await activityPage.selectAgeRangeBtn.click();
    await page.getByRole('menuitem', { name: ageRange }).click();
    await activityPage.descriptionInput.fill(description);
    await upload.upload('activity');
    await activityPage.youtubeLinkInput.fill(youtubeLink);
    await page.getByRole('button', { name: accessType }).click();
    await activityPage.fillSteps(steps);
    await activityPage.wait(1000);
    await activityPage.createNewActivityBtn.click();
    await activityPage.wait(2000);
  });
}
