import {test} from '@playwright/test';
import articleData from '../data/articleData.json'
import dotenv from 'dotenv';
import { ImageUpload } from '../pages/image_upload';
dotenv.config();

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


for (let i = 0; i < 2; i++) {
test("Add article " + (i+1), async ({page}) => {

    // get random items
    const randomTitle = getRandomItem(articleData.title);
    const randomSubtitle = getRandomItem(articleData.subtitle);
    const randomContent = getRandomItem(articleData.content);
    const randomTags = getRandomItem(articleData.tags);


    await login(page);
    await page.waitForTimeout(2000);
    await page.getByRole('link', {name: 'Parenting Guides'}).click();
    await page.getByRole('button', {name: 'Create New Article'}).click();

    // fill article title
    await page.getByRole('textbox', {name: 'Article Title'}).fill(randomTitle);

    // fill article subtitle
    await page.getByRole('textbox', {name: 'Subtitle'}).fill(randomSubtitle);

    // select category
    const category = ['Communication Play', 'Language', 'Speech', 'Swallowing', 'Voice', 'Fluency'];
    const randomCategory = getRandomItem(category);
    await page.getByRole('button', {name: randomCategory}).click();

   // fill article content
    const articleContent = page.locator('.rsw-ce');
    await articleContent.click();
    await articleContent.fill(randomContent);

    // fill article tags
    const tagsString = randomTags.join(', ');
    await page.getByRole('textbox', {name:"Add tags separated by commas (e.g., toddler, milestone, learning)"}).fill(tagsString);

    // select status
    await page.locator("(//button[@role='combobox'])[1]").click();
    // const statusOptions = ['Draft', 'Public', 'Private'];
    // const statusOptions = 'Public';
    // const randomStatus = getRandomItem(statusOptions);
    await page.getByRole('option', {name: 'Public'}).click();

    // select age range
    await page.locator("(//button[@role='combobox'])[2]").click();
    const ageRanges = ['All Ages (0-5 years)', "0-6 months", "6-12 months", "12-18 months", "18-24 months", "24-36 months", "36-48 months", "48-60 months"];
    const randomAgeRange = getRandomItem(ageRanges);
    await page.getByRole('option', {name: randomAgeRange}).click();

    // upload  image
    const imageUpload = new ImageUpload(page);
    await imageUpload.uploadRandomImage();

  
    await page.waitForTimeout(1000);

    await page.getByRole('button', {name: 'Publish Article'}).click();
    await page.waitForTimeout(1000);

});
}