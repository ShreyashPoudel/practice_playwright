import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { DashboardPage } from '../pages/dashboard';

test('Assessment - View existing and continue', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login();

  const dashboard = new DashboardPage(page);

  await dashboard.goto();

  const viewResultsBtn = page.getByRole('link', { name: 'View Results' });
  if (await viewResultsBtn.isVisible()) {
    await viewResultsBtn.click();
    await page.waitForLoadState('networkidle');
    await page.goBack();
  }

  const continueBtn = page.getByRole('link', { name: 'Continue' });
  if (await continueBtn.isVisible()) {
    await continueBtn.click();
    await page.waitForLoadState('networkidle');
    const radiogroup = page.locator('[role="radiogroup"]').first();
    if (await radiogroup.isVisible()) {
      await page.getByRole('radio').first().click();
    }
    await page.goBack();
  }
});
