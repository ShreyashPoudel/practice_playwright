import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { DashboardPage } from '../pages/dashboard';
import { GuidesPage } from '../pages/guides';
import { StorePage } from '../pages/store';
import { AssessmentPage } from '../pages/assessment';
import { ActivityPage } from '../pages/activity';

test('Growli Full Lifecycle E2E', async ({ page }) => {
  test.setTimeout(120000);

  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const guides = new GuidesPage(page);
  const store = new StorePage(page);
  const assessmentPage = new AssessmentPage(page);
  const activityPage = new ActivityPage(page);

  // 1. Login
  await loginPage.login();
  await expect(page).toHaveURL('**/dashboard');

  // 2. Dashboard verification
  await dashboard.goto();
  await expect(dashboard.welcomeHeading).toBeVisible();
  await expect(dashboard.quickActionsHeading).toBeVisible();

  // 3. Assessment section
  await assessmentPage.goto();
  await expect(page.getByRole('heading', { name: 'Assessment' })).toBeVisible();
  const existingAssessment = page.getByRole('heading', { name: 'Reading Skills' });
  if (await existingAssessment.isVisible()) {
    const viewResultsBtn = page.getByRole('link', { name: 'View Results' });
    await viewResultsBtn.click();
    await page.waitForLoadState('networkidle');
    await page.goBack();
  }

  // 4. Activity section
  await activityPage.goto();
  const activityHeading = page.getByRole('heading', { name: /Activity|Actions/i }).first();
  await expect(activityHeading).toBeVisible();
  const startActivityBtn = page.getByRole('link', { name: 'Start Activity' }).first();
  if (await startActivityBtn.isVisible()) {
    await startActivityBtn.click();
    await page.waitForLoadState('networkidle');
    const backBtn = page.locator('button').filter({ has: page.locator('svg') }).first();
    if (await backBtn.isVisible()) {
      await page.goBack();
    }
  }

  // 5. Guides section
  await guides.goto();
  await expect(guides.guidesHeading).toBeVisible();
  if (await guides.readMoreLink.isVisible()) {
    await guides.readMoreLink.click();
    await page.waitForLoadState('networkidle');
    await page.goBack();
  }

  // 6. Store section
  await store.goto();
  await expect(store.storeNav).toBeVisible();

  // 7. Notifications
  await dashboard.goto();
  const notifBadge = page.locator('[role="img"]').filter({ hasText: '5' }).first();
  if (await notifBadge.isVisible()) {
    await notifBadge.click();
    await page.waitForLoadState('networkidle');
  }

  // 8. Logout
  await dashboard.logout();
  await expect(page).toHaveURL(/login/);
});
