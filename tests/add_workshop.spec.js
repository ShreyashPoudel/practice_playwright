import { test } from "@playwright/test";
import workshopData from "../data/workshopData.json" assert { type: "json" };
import { ImageUpload } from "../pages/image_upload_activity";
import { LoginPage } from "../pages/login";
test.setTimeout(30000);

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

for (let i = 0; i < 1; i++) {
  test("Add workshop " + (i + 1), async ({ page }) => {
    const randomTitle = getRandomItem(workshopData.workshopTitles);
    const randomDescription = getRandomItem(workshopData.workshopDescriptions);
    const randomYoutubeLink = getRandomItem(workshopData.youtubeLinks);
    const randomAccessType = getRandomItem(workshopData.accessType);

    // login
    const loginPage = new LoginPage(page);
    await loginPage.login();
    await page.waitForTimeout(2000);

    // navigate to activities
    await page.goto("https://growli-slp.com/admin/activities");

    // click View Workshop
    await page.getByRole("button", { name: "View Workshop" }).click();

    await page.getByRole("button", { name: "Create New Workshop" }).click();

    // workshop title
    await page.getByRole("textbox", { name: "Workshop Title" }).fill(randomTitle);

    // fill description
    await page.getByRole("textbox", { name: "Workshop Description" }).fill(randomDescription);

    // add media
    const coverUpload = new ImageUpload(page);
    await coverUpload.uploadRandomImage();

    // fill youtube link
    await page.locator("//input[@placeholder='https://youtube.com/watch?v=...']").fill(randomYoutubeLink);

    // workshop access type
    await page.getByRole("button", { name: randomAccessType }).click();

    await page.waitForTimeout(1000);
    await page.getByRole("button", { name: "Create New Workshop" }).click();
    await page.waitForTimeout(2000);
  });
}