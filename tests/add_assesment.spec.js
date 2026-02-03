import {test} from '@playwright/test';
import  dotenv from 'dotenv';
dotenv.config();
test.setTimeout(60000);

async function login(page) {
    await page.goto('https://dev-gweb.gateway.do.webpoint.io/');
    await page.getByRole('link', {name: 'Get Started'}).click();
    await page.getByRole('textbox', {name: 'Email Address'}).fill(process.env.EMAIL);
    await page.getByRole('textbox', {name: 'Password'}).fill(process.env.PASSWORD);
    await page.locator('button[type="submit"]').click();
}

test("Add activity " , async ({page}) => {
    await login(page);
    await page.waitForTimeout(3000);
    await page.goto('https://dev-gweb.gateway.do.webpoint.io/admin/assessments');
    await page.getByRole('link', {name: 'Add Assessment'}).click();
    await page.waitForTimeout(2000);

    await page.getByRole('textbox', {name: 'Assessment Title'}).fill('Test Assessment');

    await page.getByRole('button', {name: 'Select Age Range'}).click();
    await page.getByRole('menuitem', {name: '0-6 Months'}).click();

    await page.getByRole('textbox', {name: 'Description for Parents'}).fill('Test Assessment');
    
    await page.getByRole('combobox').filter({ hasText: 'Select category' }).click();
    await page.getByRole('option', { name: 'Speech' }).click();

    await page.getByRole('textbox', {name: '5-10 minutes'}).fill('3 minutes');

    await page.getByRole('combobox').filter({ hasText: 'Beginner' }).click();
    await page.getByRole('option', { name: 'Intermediate' }).click();

    // await page.getByRole('button', { name: 'Public' }).click();


    await page.getByRole('textbox', { name: 'e.g., Can your little one sit' }).click();
    await page.getByRole('textbox', { name: 'e.g., Can your little one sit' }).fill('question 1');
    await page.getByRole('button', { name: 'Add Question' }).click();

    await page.locator('input[name="questions.1.translations.0.question_text"]').fill('question 2');
    await page.locator('label').filter({ hasText: 'Not Yet' }).nth(1).click();
    await page.getByRole('button', { name: 'Add Question' }).click();

    await page.locator('input[name="questions.2.translations.0.question_text"]').fill('question 3');
    await page.locator('label').filter({ hasText: 'Sometimes' }).nth(2).click();
    await page.getByRole('button', { name: 'Add Question' }).click();
    
    await page.locator('input[name="questions.3.translations.0.question_text"]').fill('question 4');

    await page.waitForTimeout(2000);

    await page.getByRole('button', { name: 'Publish Assessment' }).click();


});