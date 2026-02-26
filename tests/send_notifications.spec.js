import {test} from '@playwright/test';
import { LoginPage } from '../pages/login';
import notificationData from '../Data/notificationData.json';
test.setTimeout(60000);


function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

for (let i = 0; i < 5; i++) {
test('Send Notifications' + (i + 1) , async ({page}) => {

    // random selection
    const randomTitle = getRandomItem(notificationData.titles);
    const randomMessage = getRandomItem(notificationData.messages);
    const randomNotificationType = getRandomItem(notificationData.notificationType);

    // login 
    const loginPage = new LoginPage(page);
    await loginPage.login();

    // navigate to notifications page
    await page.getByRole('link', {name: 'Notifications'}).click();
    await page.getByRole('button', { name: 'Create New' }).click();

    // select notification type
    await page.locator('text=' + randomNotificationType).first().click();
    await page.waitForTimeout(5000);

    // fill title 
    const Titlename = 'e.g., Time for Today\'s';
    await page.getByRole('textbox', { name: Titlename}).click();
    await page.getByRole('textbox', { name: Titlename }).fill(randomTitle);

    // fill message
    const MesssageName = 'Write a friendly message for';
    await page.getByRole('textbox', { name: MesssageName }).click();
    await page.getByRole('textbox', { name: MesssageName }).fill(randomMessage);
    await page.waitForTimeout(2000);

    // fill button link
    const link = "https://dev.growli-slp.com/";
    await page.getByRole('textbox', { name: 'https://www.growli-slp.com/url-name' }).fill(link);

    // fill button name
    const buttonName = "Click Here";
    await page.getByRole('textbox', { name: 'Start Assessment' }).fill(buttonName);

    await page.getByRole('button', { name: 'Send Notification' }).click();
    await page.waitForTimeout(5000);

});
}