import { test } from '@playwright/test';
console.log("Imported test from Playwright");

import assessmentData from '../Data/assessmentData.json';
console.log("Loaded assessment data");

import { LoginPage } from '../pages/login';
console.log("Imported LoginPage");

test.setTimeout(60000);
console.log("Timeout set to 60 seconds");

function getRandomItem(array) {
    console.log("Getting random item from array:", array);
    const item = array[Math.floor(Math.random() * array.length)];
    console.log("Selected item:", item);
    return item;
}

for (let i = 0; i < 2; i++) {
test("Add assessment " + (i + 1), async ({ page }) => {
    console.log("Test started: Add assessment");

    const randomTitle = getRandomItem(assessmentData.assessmentTitles);
    console.log("Random Title:", randomTitle);

    const randomAgeRange = getRandomItem(assessmentData.ageRanges);
    console.log("Random Age Range:", randomAgeRange);

    const randomDescription = getRandomItem(assessmentData.parentDescriptions);
    console.log("Random Description:", randomDescription);

    const randomCategory = getRandomItem(assessmentData.categories);
    console.log("Random Category:", randomCategory);
    
    // login 
    const loginPage = new LoginPage(page);
    console.log("LoginPage instance created");

    await loginPage.login();
    console.log("Login completed");

    await page.waitForTimeout(3000);
    console.log("Waited for 3 seconds");

    await page.goto(process.env.URL + 'admin/assessments');
    console.log("Navigated to assessments page:", process.env.URL + 'admin/assessments');

    await page.getByRole('link', { name: 'Create Assessment' }).click();
    console.log("Clicked Create Assessment");

    await page.waitForTimeout(2000);
    console.log("Waited for 2 seconds");

    await page.getByRole('textbox', { name: 'Assessment Title' }).fill(randomTitle);
    console.log("Filled Assessment Title");

    // add age
    await page.getByRole('button', { name: 'Select Age Range' }).click();
    console.log("Clicked Select Age Range");

    await page.getByRole('menuitem', { name: randomAgeRange }).click();
    console.log("Selected Age Range");

    // add description
    await page.getByRole('textbox', { name: 'Description for Parents' }).fill(randomDescription);
    console.log("Filled Description");

    // add category
    await page.getByRole('button', { name: 'Select category' }).click();
    console.log("Clicked Select Category");

    await page.getByRole('menuitem', { name: randomCategory }).click();
    console.log("Selected Category");

    // add random questions
    const questions = [...assessmentData.questions];
    console.log("Copied questions array");

    questions.sort(() => Math.random() - 0.5);
    console.log("Shuffled questions");

    const n = Math.floor(Math.random() * 8) + 1;
    console.log("Number of questions to add:", n);

    const questionBoxes = page.getByRole('textbox', { name: 'e.g., Can your little one sit without support?' });
    console.log("Located question textboxes");

    for (let i = 0; i < n; i++) {
        console.log(`Filling question ${i + 1}:`, questions[i]);

        await questionBoxes.nth(i).fill(questions[i]);
        console.log(`Filled question ${i + 1}`);

        if (i < n - 1) {
            await page.getByRole('button', { name: 'Add Question' }).click();
            console.log("Clicked Add Question");

            await questionBoxes.nth(i + 1).waitFor();
            console.log(`Next question box ${i + 2} is ready`);
        }
    }
    
    await page.waitForTimeout(1000);
    console.log("Waited for 1 second");

    await page.getByRole('button', { name: 'Publish Assessment' }).click();
    console.log("Clicked Publish Assessment");

    console.log("Test completed successfully");
});
}