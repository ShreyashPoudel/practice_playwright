import { test } from '@playwright/test';
import assessmentData from '../data/assessmentData.json';
import { LoginPage } from '../pages/login';
import { AssessmentPage } from '../pages/assessment';

test.setTimeout(60000);

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

for (let i = 0; i < 2; i++) {
  test(`Add assessment ${i + 1}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login();

    const assessmentPage = new AssessmentPage(page);

    const title = getRandomItem(assessmentData.assessmentTitles);
    const ageRange = getRandomItem(assessmentData.ageRanges);
    const description = getRandomItem(assessmentData.parentDescriptions);
    const category = getRandomItem(assessmentData.categories);

    const questions = [...assessmentData.questions];
    questions.sort(() => Math.random() - 0.5);
    const n = Math.floor(Math.random() * 8) + 1;
    const selectedQuestions = questions.slice(0, n);

    await assessmentPage.gotoAdmin();
    await assessmentPage.createAssessmentLink.click();
    await assessmentPage.titleInput.fill(title);
    await assessmentPage.ageRangeBtn.click();
    await page.getByRole('menuitem', { name: ageRange }).click();
    await assessmentPage.descriptionInput.fill(description);
    await assessmentPage.categoryBtn.click();
    await page.getByRole('menuitem', { name: category }).click();

    for (let j = 0; j < selectedQuestions.length; j++) {
      await assessmentPage.questionInput.nth(j).fill(selectedQuestions[j]);
      if (j < selectedQuestions.length - 1) {
        await assessmentPage.addQuestionBtn.click();
        await assessmentPage.questionInput.nth(j + 1).waitFor();
      }
    }

    await assessmentPage.wait(1000);
    await assessmentPage.publishBtn.click();
  });
}
