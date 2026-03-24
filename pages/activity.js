export class ActivityPage {
  constructor(page) {
    this.page = page;
    this.createActivityBtn = page.getByRole("button", { name: "Create Activity" });
    this.titleInput = page.getByRole("textbox", { name: "Activity Title" });
    this.chooseCategoryBtn = page.getByRole("button", { name: "Choose category" });
    this.selectAgeRangeBtn = page.getByRole("button", { name: "Select age range" });
    this.descriptionInput = page.getByRole("textbox", { name: "Activity Description" });
    this.youtubeLinkInput = page.locator("//input[@placeholder='https://youtube.com/watch?v=...']");
    this.firstStepInput = page.getByPlaceholder("First magical step...");
    this.secondStepInput = page.getByPlaceholder("Second wonderful step...");
    this.addAnotherStepBtn = page.getByRole("button", { name: "+ Add Another Step" });
  }

  async navigate() {
    await this.page.goto(process.env.URL + "admin/activities");
  }

  async clickCreateActivity() {
    await this.createActivityBtn.click();
  }

  async fillTitle(title) {
    await this.titleInput.fill(title);
  }

  async selectCategory(category) {
    await this.chooseCategoryBtn.click();
    await this.page.getByRole("menuitem", { name: category }).click();
    await this.page.mouse.click(0, 0);
  }

  async selectAgeRange(ageRange) {
    await this.selectAgeRangeBtn.click();
    await this.page.getByRole("menuitem", { name: ageRange }).click();
  }

  async fillDescription(description) {
    await this.descriptionInput.fill(description);
  }

  async fillYoutubeLink(link) {
    await this.youtubeLinkInput.fill(link);
  }

  async selectAccessType(accessType) {
    await this.page.getByRole("button", { name: accessType }).click();
  }

  async fillSteps(stepsArray) {
    const n = Math.floor(Math.random() * 6) + 1;
    await this.firstStepInput.waitFor();

    for (let i = 0; i < n; i++) {
      if (i === 0) {
        await this.firstStepInput.fill(stepsArray[i]);
      } else if (i === 1) {
        await this.secondStepInput.fill(stepsArray[i]);
      } else {
        await this.addAnotherStepBtn.click();
        await this.page.getByPlaceholder("e.g., Prepare the materials").nth(i).waitFor();
        await this.page.getByPlaceholder("e.g., Prepare the materials").nth(i).fill(stepsArray[i]);
      }
    }
  }

  async submitActivity() {
    await this.page.waitForTimeout(1000);
    await this.createActivityBtn.click();
  }
}
