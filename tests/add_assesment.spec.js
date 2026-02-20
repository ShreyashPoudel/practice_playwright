import {test} from '@playwright/test';
import assessmentData from '../Data/assessmentData.json';
import  dotenv from 'dotenv';
dotenv.config();
test.setTimeout(60000);

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

for (let i = 0; i < 3; i++) {
test("Add activity " + (i + 1), async ({page}) => {

    const randomTitle = getRandomItem(assessmentData.assessmentTitles);
    const randomAgeRange = getRandomItem(assessmentData.ageRanges);
    const randomDescription = getRandomItem(assessmentData.parentDescriptions);
    const randomCategory = getRandomItem(assessmentData.categories);
    const randomDuration = getRandomItem(assessmentData.timeRanges);
    const randomDifficulty = getRandomItem(assessmentData.difficultyLevels);
    // const randomQuestions = getRandomItem(assessmentData.questions);

    await login(page);
    await page.waitForTimeout(3000);
    await page.goto('https://dev.growli-slp.com/admin/assessments');
    await page.getByRole('link', {name: 'Create Assessment'}).click();
    await page.waitForTimeout(2000);

    await page.getByRole('textbox', {name: 'Assessment Title'}).fill(randomTitle);

    // add age
    await page.getByRole('button', {name: 'Select Age Range'}).click();
    await page.getByRole('menuitem', {name: randomAgeRange}).click();

    // add description
    await page.getByRole('textbox', {name: 'Description for Parents'}).fill(randomDescription);
    
    // add category
    // await page.getByRole('combobox').filter({ hasText: 'Select category' }).click();
    // await page.getByRole('option', { name: randomCategory }).click();

    // add duration
    await page.getByRole('textbox', {name: '5-10 minutes'}).fill(randomDuration);

    // add difficulty
    await page.getByRole('combobox').filter({ hasText: 'Beginner' }).click();
    await page.getByRole('option', { name: randomDifficulty }).click();

    // add random questions
    const questions = [...assessmentData.questions];
    questions.sort(() => Math.random() - 0.5);
    const n = Math.floor(Math.random() * 8) + 1; // Random number of questions between 1 and 8
    const questionBoxes = page.getByRole('textbox', {name: 'e.g., Can your little one sit without support?'});
    for (let i = 0; i < n; i++) {
    await questionBoxes.nth(i).fill(questions[i]);

    if (i < n-1) {
        await page.getByRole('button', { name: 'Add Question' }).click();
        await questionBoxes.nth(i + 1).waitFor();
    }
    }
    
    await page.waitForTimeout(2000);

    await page.getByRole('button', { name: 'Publish Assessment' }).click();

    await page.waitForTimeout(5000);


});
}