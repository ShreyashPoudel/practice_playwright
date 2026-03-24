import {test} from '@playwright/test';
import assessmentData from '../Data/assessmentData.json';
import { LoginPage } from '../pages/login';
test.setTimeout(60000);

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
} 

for (let i = 0; i < 2; i++) {
test("Add assessment " + (i + 1), async ({page}) => {

    const randomTitle = getRandomItem(assessmentData.assessmentTitles);
    const randomAgeRange = getRandomItem(assessmentData.ageRanges);
    const randomDescription = getRandomItem(assessmentData.parentDescriptions);
    const randomCategory = getRandomItem(assessmentData.categories);
    
    // login 
    const loginPage = new LoginPage(page);
    await loginPage.login();


    await page.waitForTimeout(3000);
    await page.goto(process.env.URL + 'admin/assessments');
    await page.getByRole('link', {name: 'Create Assessment'}).click();
    await page.waitForTimeout(2000);

    // await page.pause();
    
    await page.getByRole('textbox', {name: 'Assessment Title'}).fill(randomTitle);

    // add age
    await page.getByRole('button', {name: 'Select Age Range'}).click();
    await page.getByRole('menuitem', {name: randomAgeRange}).click();

    // add description
    await page.getByRole('textbox', {name: 'Description for Parents'}).fill(randomDescription);
    
    // add category
    // await page.getByRole('button').filter({ hasText: 'Select category' }).click();
    await page.getByRole('button', {name: 'Select category'}).click();
    await page.getByRole('menuitem', { name: randomCategory }).click();

    // add random questions
    const questions = [...assessmentData.questions];
    questions.sort(() => Math.random() - 0.5);
    const n = Math.floor(Math.random() * 8) + 1; // Random number of questions between 1 and 8
    const questionBoxes = page.getByRole('textbox', {name: 'Enter translated question'});
    for (let i = 0; i < n; i++) {
    await questionBoxes.nth(i).fill(questions[i]);

    if (i < n-1) {
        await page.getByRole('button', { name: 'Add Question' }).click();
        await questionBoxes.nth(i + 1).waitFor();
    }
    }
    
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: 'Publish Assessment' }).click();

});
}