import {test} from '@playwright/test';
import articleData from '../data/articleData.json'
import { LoginPage } from '../pages/login';
import { ImageUpload } from '../pages/image_upload_article';

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

for (let i = 0; i < 2; i++) {
    test("Add article " + (i+1), async ({page}) => {

    // get random items
    const randomTitle = getRandomItem(articleData.title);
    const randomSubtitle = getRandomItem(articleData.subtitle);
    const randomContent = getRandomItem(articleData.content);
    const randomTags = getRandomItem(articleData.tags);
    const randomAgeRange = getRandomItem(articleData.ageRanges);

    // login
    const loginPage = new LoginPage(page);
    await loginPage.login();
    await page.waitForTimeout(2000);

    // navigate to article creation page
    await page.goto("https://dev.growli-slp.com/admin/articles");
    await page.getByRole('button', {name: 'Create Article'}).click();

    // select language
    await page.getByRole('combobox', {name: 'Language'}).click();
    await page.getByRole('option', {name: 'English'}).click();

    // fill article title
    await page.getByRole('textbox', {name: 'Article Title'}).fill(randomTitle);

    // fill article subtitle
    await page.getByRole('textbox', {name: 'Subtitle'}).fill(randomSubtitle);

    // select category
    const category = ['Select Communication', 'Select Language', 'Select Speech', 'Select Swallowing', 'Select Voice', 'Select Fluency', 'Select Other'];
    const randomCategory = getRandomItem(category);
    await page.getByRole('button', {name: randomCategory}).first().click();

   // fill article content
    const articleContent = page.locator('.rsw-ce');
    await articleContent.click();
    await articleContent.fill(randomContent);

    // fill article tags
    const tagsString = randomTags.join(', ');
    await page.getByRole('textbox', {name:"Add tags separated by commas (e.g., toddler, milestone, learning)"}).fill(tagsString);

    // select status
    await page.locator("text=Status").locator("xpath=following::*[@role='combobox'][1]").click();
    await page.getByRole('option', {name: 'Public'}).click();

    // select age range
    await page.locator("text=Age Range").locator("xpath=following::*[@role='combobox'][1]").click();
    await page.getByRole('option', {name: randomAgeRange}).click();

    // emable featured article
    // await page.locator('//*[@id="app"]/div/main/div/div/div/form/div/div[2]/div[1]/div[4]/div/button').click();

    // upload  image
    const imageUpload = new ImageUpload(page);
    await imageUpload.uploadRandomImage();
    await page.waitForTimeout(3000);    

    await page.getByRole('button', {name: 'Publish Article'}).click();
    await page.waitForTimeout(3000);
 
});
}