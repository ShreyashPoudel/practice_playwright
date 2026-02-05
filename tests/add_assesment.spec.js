import {test} from '@playwright/test';
import assessmentData from '../Data/assessmentData.json';
import  dotenv from 'dotenv';
dotenv.config();
test.setTimeout(60000);

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

async function login(page) {
    await page.goto('https://dev-gweb.gateway.do.webpoint.io/');
    await page.getByRole('link', {name: 'Get Started'}).click();
    await page.getByRole('textbox', {name: 'Email Address'}).fill(process.env.EMAIL);
    await page.getByRole('textbox', {name: 'Password'}).fill(process.env.PASSWORD);
    await page.locator('button[type="submit"]').click();
}

const randomTitle = getRandomItem(assessmentData.assessmentTitles);
const randomAgeRange = getRandomItem(assessmentData.ageRanges);
const randomDescription = getRandomItem(assessmentData.parentDescriptions);
const randomCategory = getRandomItem(assessmentData.categories);
const randomDuration = getRandomItem(assessmentData.timeRanges);
const randomDifficulty = getRandomItem(assessmentData.difficultyLevels);
const randomQuestions = getRandomItem(assessmentData.questions);

test("Add activity " , async ({page}) => {
    await login(page);
    await page.waitForTimeout(3000);
    await page.goto('https://dev-gweb.gateway.do.webpoint.io/admin/assessments');
    await page.getByRole('link', {name: 'Create Assessment'}).click();
    await page.waitForTimeout(2000);

    await page.getByRole('textbox', {name: 'Assessment Title'}).fill(randomTitle);

    await page.getByRole('button', {name: 'Select Age Range'}).click();
    await page.getByRole('menuitem', {name: randomAgeRange}).click();

    await page.getByRole('textbox', {name: 'Description for Parents'}).fill(randomDescription);
    
    await page.getByRole('combobox').filter({ hasText: 'Select category' }).click();
    await page.getByRole('option', { name: randomCategory }).click();

    await page.getByRole('textbox', {name: randomDuration}).fill(randomDuration);

    await page.getByRole('combobox').filter({ hasText: 'Beginner' }).click();
    await page.getByRole('option', { name: randomDifficulty }).click();

    // await page.getByRole('button', { name: 'Public' }).click();

    await page.getByRole('textbox', { name: 'e.g., Can your little one sit without support?' }).click().fill(randomQuestions);
    await page.getByRole('button', { name: 'Add Question' }).click();

    await page.waitForTimeout(2000);
    await page.getByRole('textbox', { name: 'e.g., Can your little one sit without support?' }).click().fill(randomQuestions);
    await page.getByRole('button', { name: 'Add Question' }).click();
    

    await page.waitForTimeout(2000);

    await page.getByRole('button', { name: 'Publish Assessment' }).click();


});