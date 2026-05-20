import {test} from '@playwright/test';
import productData from '../data/productData.json';
import { LoginPage } from '../pages/login';
import { ImageUpload } from '../pages/image_upload_activity';
test.setTimeout(60000);

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

for (let i = 0; i < 10; i++) {
test("Add Product " + (i + 1) , async ({page}) => {

    const randomTitle = getRandomItem(productData.productTitles);
    const randomDescription = getRandomItem(productData.productDescriptions);
    const randomProductType = getRandomItem(productData.productTypes);
    const randomPrice = getRandomItem(productData.pricesCAD);
    const randomTag = getRandomItem(productData.activityTags);
    const randomAgeRange = getRandomItem(productData.ageRanges);
    const accessType = getRandomItem(productData.accessTypes);

    // login
    const loginPage = new LoginPage(page);
    await loginPage.login();

    // navigate to add product page
    await page.getByRole('link', {name: 'Products'}).click();
    await page.getByRole('button', {name: 'Add Product'}).first().click();

    // fill product title
    await page.getByRole('textbox', {name: 'e.g., Colorful Block Building Adventure'}).fill(randomTitle);

    // fill product type
    await page.getByRole('button', {name: 'Choose product type'}).click();
    await page.getByRole('menuitem', {name: randomProductType}).click();

    // fill age range
    await page.getByRole('button', {name: 'Select age range'}).click();
    await page.getByRole('menuitem', {name: randomAgeRange}).click();

    // fill product description
    await page.getByRole('textbox', {name: 'Describe the magical learning experience this product provides...'}).fill(randomDescription);

    // cover image upload
    const coverUpload = new ImageUpload(page);
    await coverUpload.uploadRandomImage();

    // access type
    await page.getByRole('button', {name: accessType}).click();

    // fill product price
    await page.getByRole('textbox', {name: '0.00'}).fill(randomPrice);

    // activity tags
    await page.getByRole('textbox', {name:"e.g., Language, Outdoor"}).fill(randomTag);

    // whatsapp number
    await page.getByRole('textbox', {name: 'Enter Number'}).fill("+977 1234567890");

    // press publish button
    await page.getByRole('button', {name: 'Create Product'}).click();

   

    await page.waitForTimeout(3000);

});
};