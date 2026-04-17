import { test } from '@playwright/test';
import notificationData from '../data/notificationData.json';
import { LoginPage } from '../pages/login';
import { NotificationPage } from '../pages/notification';

test.setTimeout(60000);

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSubset(arr) {
  const count = Math.floor(Math.random() * arr.length) + 1;
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

test('Send Notifications', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login();

  const notificationPage = new NotificationPage(page);

  const userType = getRandomItem(notificationData.userTypes);
  const ageGroup = getRandomItem(notificationData.ageRanges);
  const conditions = getRandomSubset(notificationData.categories);
  const title = getRandomItem(notificationData.titles);
  const message = getRandomItem(notificationData.messages);
  const notificationType = getRandomItem(notificationData.notificationType);

  await notificationPage.goto();
  await notificationPage.createNewBtn.click();
  await page.locator(`text=${userType}`).first().click();
  await notificationPage.ageRangeSelect.click();
  await page.getByRole('option', { name: ageGroup }).click();
  await notificationPage.conditionsBtn.click();
  await page.waitForSelector('[role="menuitem"]', { state: 'visible' });
  for (const condition of conditions) {
    await page.getByRole('menuitem', { name: condition }).click();
  }
  await page.keyboard.press('Escape');
  await page.locator(`text=${notificationType}`).first().click();
  await notificationPage.titleInput.fill(title);
  await notificationPage.messageInput.fill(message);
  await notificationPage.sendBtn.click();
});
