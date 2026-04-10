import { test } from '@playwright/test';
import path from 'path';

const BASE_URL = 'https://dev.growli-slp.com';
const EMAIL = 'shreyash.poudel@webpoint.io';
const PASSWORD = 'Test1234';

/**
 * Full lifecycle E2E test for Growli platform
 * Covers: Landing -> Login -> Dashboard -> Assessment -> Activity -> Guides -> Logout
 */
test('Growli Full Lifecycle E2E', async ({ page }) => {
  test.setTimeout(120000);

  // ============ 1. LANDING PAGE ============
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  // Verify landing page loads with correct title
  await expect(page).toHaveTitle(/Growli/);

  // Verify main heading is present
  const heading = page.getByRole('heading', { name: /Track Your Child's Growth Journey/i });
  await expect(heading).toBeVisible();

  // Verify navigation links exist
  await expect(page.getByRole('link', { name: 'Get Started' }).first()).toBeVisible();

  // ============ 2. LOGIN PAGE ============
  await page.getByRole('link', { name: 'Get Started' }).first().click();
  await page.waitForURL('**/login');

  // Verify login form elements
  const emailInput = page.getByRole('textbox', { name: 'Email Address' });
  const passwordInput = page.getByRole('textbox', { name: 'Password' });
  const loginButton = page.getByRole('button', { name: 'Log In' });

  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(loginButton).toBeVisible();

  // Fill credentials and login
  await emailInput.fill(EMAIL);
  await passwordInput.fill(PASSWORD);
  await loginButton.click();

  // Wait for dashboard to load
  await page.waitForURL('**/dashboard');
  await page.waitForLoadState('networkidle');

  // ============ 3. DASHBOARD ============
  // Verify dashboard loaded with user greeting
  const welcomeHeading = page.getByRole('heading', { name: /Hello, Shreyash Poudel!/i });
  await expect(welcomeHeading).toBeVisible();

  // Verify child profile card exists
  const childCard = page.locator('text=Smith').first();
  await expect(childCard).toBeVisible();

  // Verify quick actions section
  const quickActions = page.getByRole('heading', { name: 'Quick Actions' });
  await expect(quickActions).toBeVisible();

  // Verify notification badge shows
  const notificationBadge = page.locator('text="5"').first();
  await expect(notificationBadge).toBeVisible();

  // ============ 4. ASSESSMENT SECTION ============
  await page.goto(`${BASE_URL}/dashboard/assessment`);
  await page.waitForLoadState('networkidle');

  // Verify assessment page loads
  const assessmentHeading = page.getByRole('heading', { name: 'Assessment' });
  await expect(assessmentHeading).toBeVisible();

  // Check existing assessments
  const existingAssessment = page.getByRole('heading', { name: 'Reading Skills' });
  if (await existingAssessment.isVisible()) {
    // View existing results
    const viewResultsBtn = page.getByRole('link', { name: 'View Results' });
    await viewResultsBtn.click();
    await page.waitForLoadState('networkidle');
    // Go back to assessment list
    await page.goBack();
  }

  // Check in-progress assessment
  const continueBtn = page.getByRole('link', { name: 'Continue' });
  if (await continueBtn.isVisible()) {
    await continueBtn.click();
    await page.waitForLoadState('networkidle');
    // Answer a question and go back
    const firstQuestion = page.locator('[role="radiogroup"]').first();
    if (await firstQuestion.isVisible()) {
      const firstOption = page.getByRole('radio').first();
      await firstOption.click();
    }
    await page.goBack();
  }

  // ============ 5. ACTIVITY SECTION ============
  await page.goto(`${BASE_URL}/dashboard/activity`);
  await page.waitForLoadState('networkidle');

  // Verify activity page loads
  const activityHeading = page.getByRole('heading', { name: /Activity|Actions/i }).first();
  await expect(activityHeading).toBeVisible();

  // Check for activity cards
  const startActivityBtn = page.getByRole('link', { name: 'Start Activity' }).first();
  if (await startActivityBtn.isVisible()) {
    // Start an activity
    await startActivityBtn.click();
    await page.waitForLoadState('networkidle');

    // Check activity detail page
    const backBtn = page.locator('button').filter({ has: page.locator('svg') }).first();
    if (await backBtn.isVisible()) {
      await page.goBack();
    }
  }

  // ============ 6. PARENTING GUIDES ============
  await page.goto(`${BASE_URL}/guides`);
  await page.waitForLoadState('networkidle');

  // Verify guides page loads
  const guidesHeading = page.getByRole('heading', { name: /Guide|Article/i }).first();
  await expect(guidesHeading).toBeVisible();

  // Click on first article
  const firstArticle = page.getByRole('link', { name: 'Read More' }).first();
  if (await firstArticle.isVisible()) {
    await firstArticle.click();
    await page.waitForLoadState('networkidle');
    // Go back
    await page.goBack();
  }

  // ============ 7. STORE SECTION ============
  await page.goto(`${BASE_URL}/dashboard/store`);
  await page.waitForLoadState('networkidle');

  // Verify store page loads (may show products or be empty)
  const storeNav = page.getByRole('link', { name: 'Store' });
  await expect(storeNav).toBeVisible();

  // ============ 8. NOTIFICATIONS ============
  // Access notifications via badge click
  await page.goto(`${BASE_URL}/dashboard`);

  // Click notification icon/badge
  const notifBadge = page.locator('[role="img"]').filter({ hasText: '5' }).first();
  if (await notifBadge.isVisible()) {
    await notifBadge.click();
    await page.waitForLoadState('networkidle');
  }

  // ============ 9. LOGOUT ============
  // Click user profile menu
  const userAvatar = page.locator('img[alt="Shreyash Poudel"]').first();
  if (await userAvatar.isVisible()) {
    await userAvatar.click();
    await page.waitForTimeout(500);

    // Look for logout option
    const logoutBtn = page.getByRole('button', { name: /logout|sign out|log out/i });
    if (await logoutBtn.isVisible()) {
      await logoutBtn.click();
      await page.waitForURL('**/login', { timeout: 10000 });
    }
  }

  // Verify logged out - should be redirected to login
  await expect(page).toHaveURL(/login/);
});

// Helper for expect
import { expect } from '@playwright/test';