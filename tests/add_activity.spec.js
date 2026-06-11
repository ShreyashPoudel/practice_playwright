import { expect, test } from "@playwright/test";
import activityData from "../Data/activityData.json" assert { type: "json" };
import { ImageUpload } from "../pages/image_upload_activity";
import { VideoUpload } from "../pages/video_upload_activity";
import { LoginPage } from "../pages/login";
test.setTimeout(1000000);

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

for (let i = 0; i < 4; i++) {await page.getByRole('button', { name: 'Select age range' }).click();
await page.getByRole('menuitem', { name: '-12 months' }).click();
  test("Add activity " + (i + 1), async ({ page }) => {
    const randomTitle = getRandomItem(activityData.activityTitles);
    const randomType = getRandomItem(activityData.activityTypes);
    const randomAgeRange = getRandomItem(activityData.ageRanges);
    const randomDescription = getRandomItem(activityData.activityDescriptions);
    const randomYoutubeLink = getRandomItem(activityData.youtubeLinks);
    const randomAccessType = getRandomItem(activityData.accessType);

    // login
    const loginPage = new LoginPage(page);
    await loginPage.login();
    await page.waitForTimeout(2000);

    // navigate to activities
    await page.goto("https://dev.growli-slp.com/admin/activities");
    await page.getByRole("button", { name: "Create Activity" }).click();
    await page
      .getByRole("textbox", { name: "Activity Title" })
      .fill(randomTitle);

    // select category
    await page.getByRole("button", { name: "Choose category" }).click();
    await page.getByRole("menuitem", { name: randomType }).click();
    await page.mouse.click(0, 0);

    // select age range

  
    const age = ['-3 months', '-6 months', '-9 months','-12 months','-15 months','-18 months', '-2 years','-2.5 years','-3 years','-3.5 years','-4 years','-4.5 years','-5 years'];
    const randomAge = getRandomItem(age);
    await page.getByRole('button', { name: 'Select age range' }).click();
    await page.getByRole('menuitem', { name: randomAge }).click();

    // await page.getByRole("button", { name: "Select age range" }).click();
    await page.getByRole('menuitem', { name: '-3 months' }).click();
    // await page.getByRole("menuitem", { name: randomAgeRange }).click();

    // fill description
    await page
      .getByRole("textbox", { name: "Activity Description" })
      .fill(randomDescription);

    // add photo
    const coverUpload = new ImageUpload(page);
    await coverUpload.uploadRandomImage();
    await page.waitForTimeout(3000);
    
    // // add video
    // const videoUpload = new VideoUpload(page);
    // await videoUpload.uploadRandomVideo();
    // await page.waitForTimeout(3000);

    // fill youtube link
    await page
      .locator("//input[@placeholder='https://youtube.com/watch?v=...']")
      .fill(randomYoutubeLink);

    // activity access type
    await page.getByRole("button", { name: randomAccessType }).click();

    const allSteps = [
      ...activityData.steps1,
      ...activityData.steps2,
      // ...activityData.step3,
    ];

    allSteps.sort(() => Math.random() - 0.5);

    // Random number of steps
    const n = Math.floor(Math.random() * 6) + 1;
    await page.getByPlaceholder("e.g., Prepare the materials");

    for (let i = 0; i < n; i++) {
      if (i === 0) {
        await page.getByPlaceholder('e.g., Prepare the materials').first().fill(allSteps[i]);
      }
       else if (i === 1) {
        await page.getByPlaceholder('e.g., Prepare the materials').nth(1).fill(allSteps[i]);
          
        // await page
        //   .getByPlaceholder("e.g., Prepare the materials")
        //   .fill(allSteps[i]);
      } else {
        await page.getByRole("button", { name: "+ Add Another Step" }).click();
        await page.getByPlaceholder("e.g., Prepare the materials").nth(i).waitFor();
        await page.getByPlaceholder("e.g., Prepare the materials").nth(i).fill(allSteps[i]);
      }
    }
    await page.waitForTimeout(1000);
    await page.getByRole("button", { name: "Create New Activity" }).click();
    await page.waitForTimeout(2000);
  });
}
