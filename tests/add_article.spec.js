import { test } from '@playwright/test';
import articleData from '../data/articleData.json';
import { LoginPage } from '../pages/login';
import { ArticlePage } from '../pages/article';
import { ImageUpload } from '../helpers/upload';

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

for (let i = 0; i < 2; i++) {
  test(`Add article ${i + 1}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login();

    const articlePage = new ArticlePage(page);
    const upload = new ImageUpload(page);

    const title = getRandomItem(articleData.title);
    const subtitle = getRandomItem(articleData.subtitle);
    const content = getRandomItem(articleData.content);
    const tags = getRandomItem(articleData.tags);
    const ageRange = getRandomItem(articleData.ageRanges);
    const categories = ['Communication Play', 'Language', 'Speech', 'Swallowing', 'Voice', 'Fluency'];
    const category = getRandomItem(categories);

    await articlePage.goto();
    await articlePage.createArticleBtn.click();
    await articlePage.languageSelect.click();
    await page.getByRole('option', { name: 'English' }).click();
    await articlePage.titleInput.fill(title);
    await articlePage.subtitleInput.fill(subtitle);
    await page.getByRole('button', { name: category }).first().click();
    await articlePage.contentEditor.click();
    await articlePage.contentEditor.fill(content);
    await articlePage.tagsInput.fill(tags.join(', '));
    await articlePage.selectAgeRange(ageRange);
    await articlePage.selectStatus('Public');
    await upload.upload('article');
    await articlePage.wait(5000);
    await articlePage.publishBtn.click();
  });
}
