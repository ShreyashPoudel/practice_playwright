import { test } from '@playwright/test';
import workshopData from '../data/workshopData.json';
import { LoginPage } from '../pages/login';
import { WorkshopPage } from '../pages/workshop';
import { ImageUpload } from '../helpers/upload';

test.setTimeout(30000);

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

test('Add workshop', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login();

  const workshopPage = new WorkshopPage(page);
  const upload = new ImageUpload(page);

  const title = getRandomItem(workshopData.workshopTitles);
  const description = getRandomItem(workshopData.workshopDescriptions);
  const youtubeLink = getRandomItem(workshopData.youtubeLinks);
  const accessType = getRandomItem(workshopData.accessTypes);

  await workshopPage.goto();
  await workshopPage.viewWorkshopBtn.click();
  await workshopPage.createWorkshopBtn.click();
  await workshopPage.titleInput.fill(title);
  await workshopPage.descriptionInput.fill(description);
  await upload.upload('activity');
  await workshopPage.youtubeLinkInput.fill(youtubeLink);
  await page.getByRole('button', { name: accessType }).click();
  await workshopPage.wait(1000);
  await workshopPage.createWorkshopBtn.click();
  await workshopPage.wait(2000);
});
