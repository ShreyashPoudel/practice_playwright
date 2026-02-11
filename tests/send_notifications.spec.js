import {test} from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
test.setTimeout(60000);

async function login(page) {
    await page.goto(process.env.URL);
    await page.getByRole('link', {name: 'Get Started'}).click();
    await page.getByRole('textbox', {name: 'Email Address'}).fill(process.env.EMAIL);
    await page.getByRole('textbox', {name: 'Password'}).fill(process.env.PASSWORD);
    await page.locator('button[type="submit"]').click();
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

for (let i = 0; i < 5; i++) {
test('Send Notifications' + (i+1), async ({page}) => {
    await login(page);
    await page.getByRole('link', {name: 'Notifications'}).click();

    // await page.getByText("Select Child's Age").click();

    // // await page.getByRole('combobox', {name: "Select Child's Age"}).click();
    // await page.getByRole('option', {name: '3-5 Years'}).click();

    // await page.getByText("Select Child's Condition").click();
    // await page.getByRole('option', {name: 'ADHD'}).click();

    // const notificationTypes = ['Reminder', 'New Activity', 'Milestone', 'Parenting Tip'];
    // const randomNotificationType = getRandomItem(notificationTypes);
    // await page.getByRole('combobox', {name: 'Select Notification Type'}).click();
    // await page.getByRole('option', {name: randomNotificationType}).click();

    // await page.locator('div').filter({ hasText: 'Reminder'}).click();
  // await page.locator('div').filter({ hasText: /^New Activity$/ }).click();
  // await page.locator('div').filter({ hasText: /^Milestone$/ }).click();
  // await page.locator('div').filter({ hasText: /^Parenting Tip$/ }).click();
  // await page.locator('div').filter({ hasText: /^Reminder$/ }).click();

   const titles = [
  "Time for Today's Activity! 🎉",
  "Don't forget to check out our new features! 🚀",
  "Learning time starts now! 📚",
  "New activity just dropped! ✨",
  "Let’s play and learn together! 🧩"
    ];

const messages = [
  "A fun new activity is waiting for your child. Let’s get started!",
  "Explore exciting features designed to help your child grow and learn.",
  "Short, playful activities can make learning fun and easy.",
  "Your child will love today’s learning challenge!",
  "Tap here to begin a joyful learning journey."
];



// random selection
const randomTitle = getRandomItem(titles);
const randomMessage = getRandomItem(messages);

    await page.getByRole('textbox', { name: 'e.g., Time for Today\'s' }).click();
    await page.getByRole('textbox', { name: 'e.g., Time for Today\'s' }).fill(randomTitle);
    await page.getByRole('textbox', { name: 'Write a friendly message for' }).click();
    await page.getByRole('textbox', { name: 'Write a friendly message for' }).fill(randomMessage);
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Send Notification' }).click();
    await page.waitForTimeout(5000);

});
}