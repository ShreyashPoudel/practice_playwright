import {test} from '@playwright/test';
import { LoginPage } from '../pages/login';
import notificationData from '../Data/notificationData.json';
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

// for (let i = 0; i < 5; i++) {
test('Send Notifications' , async ({page}) => {

    // random selection
    const randomUserType = getRandomItem(notificationData.userTypes);
    const randomAgeGroup = getRandomItem(notificationData.ageRanges);
    const randomChildConditions = getRandomSubset(notificationData.categories);
    const randomTitle = getRandomItem(notificationData.titles);
    const randomMessage = getRandomItem(notificationData.messages);
    const randomNotificationType = getRandomItem(notificationData.notificationType);
    const randomLanguageType = getRandomItem(notificationData.languageType);
    

    // login 
    const loginPage = new LoginPage(page);
    await loginPage.login();

    // navigate to notifications page
    await page.getByRole('link', {name: 'Notifications'}).click();
    await page.getByRole('link', { name: 'Create Notification' }).click();
    
    // select user type
    await page.locator('text=' + randomUserType).first().click();
    
    // select age range
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: randomAgeGroup }).click();
    // await page.getByLabel('-12 months').getByText('-12 months').click();


    // select child condition
    await page.getByRole('button', { name: 'Select conditions' }).click();
    await page.waitForSelector('[role="menuitem"]', { state: 'visible' });

    for (const condition of randomChildConditions) {
      await page.getByRole('menuitem', { name: condition }).click();
    }

    await page.keyboard.press('Escape');

    // select notification type
    await page.locator('text=' + randomNotificationType).first().click();
    await page.waitForTimeout(5000);
    
    // select language type
    // await page.getByRole('button', { name: randomLanguageType }).click();

    // fill title 
    const Titlename = 'e.g., Time for Today\'s';
    await page.getByRole('textbox', { name: Titlename}).click();
    await page.getByRole('textbox', { name: Titlename }).fill(randomTitle);

    // fill message
    const MesssageName = 'Write a friendly message for';
    await page.getByRole('textbox', { name: MesssageName }).click();
    await page.getByRole('textbox', { name: MesssageName }).fill(randomMessage);
    await page.waitForTimeout(2000);

    // // fill button link
    // const link = "https://dev.growli-slp.com/";
    // await page.getByRole('textbox', { name: 'https://www.growli-slp.com/url-name' }).fill(link);

    // // fill button name
    // const buttonName = "Click Here";
    // await page.getByRole('textbox', { name: 'Start Assessment' }).fill(buttonName);

    await page.getByRole('button', { name: 'Send Notification' }).click();
});
// }