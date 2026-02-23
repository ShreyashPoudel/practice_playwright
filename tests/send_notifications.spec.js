import {test} from '@playwright/test';
import { LoginPage } from '../pages/login';
import notificationData from '../Data/notificationData.json';
test.setTimeout(60000);


function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

for (let i = 0; i < 5; i++) {
test('Send Notifications' + (i+1), async ({page}) => {

    // random selection
    const randomTitle = getRandomItem(notificationData.titles);
    const randomMessage = getRandomItem(notificationData.messages);

    // login 
    const loginPage = new LoginPage(page);
    await loginPage.login();

    // navigate to notifications page
    await page.getByRole('link', {name: 'Notifications'}).click();
    await page.getByRole('button', { name: 'Create New' }).click();

    // fill title 
    await page.getByRole('textbox', { name: 'e.g., Time for Today\'s' }).click();
    await page.getByRole('textbox', { name: 'e.g., Time for Today\'s' }).fill(randomTitle);

    // fill message
    await page.getByRole('textbox', { name: 'Write a friendly message for' }).click();
    await page.getByRole('textbox', { name: 'Write a friendly message for' }).fill(randomMessage);
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