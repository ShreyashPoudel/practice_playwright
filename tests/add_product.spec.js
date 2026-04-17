import { test } from '@playwright/test';
import productData from '../data/productData.json';
import { LoginPage } from '../pages/login';
import { ProductPage } from '../pages/product';
import { ImageUpload } from '../helpers/upload';

test.setTimeout(60000);

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

for (let i = 0; i < 2; i++) {
  test(`Add Product ${i + 1}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login();

    const productPage = new ProductPage(page);
    const upload = new ImageUpload(page);

    const title = getRandomItem(productData.productTitles);
    const description = getRandomItem(productData.productDescriptions);
    const productType = getRandomItem(productData.productTypes);
    const price = getRandomItem(productData.pricesCAD);
    const tags = getRandomItem(productData.activityTags);
    const ageRange = getRandomItem(productData.ageRanges);
    const accessType = getRandomItem(productData.accessTypes);

    await productPage.goto();
    await productPage.addProductBtn.click();
    await productPage.titleInput.fill(title);
    await productPage.productTypeBtn.click();
    await page.getByRole('menuitem', { name: productType }).click();
    await productPage.ageRangeBtn.click();
    await page.getByRole('menuitem', { name: ageRange }).click();
    await productPage.descriptionInput.fill(description);
    await upload.upload('activity');
    await page.getByRole('button', { name: accessType }).click();
    await productPage.priceInput.fill(price);
    await productPage.tagsInput.fill(tags);
    await productPage.whatsappInput.fill('+977 1234567890');
    await productPage.createProductBtn.click();
    await productPage.wait(3000);
  });
}
