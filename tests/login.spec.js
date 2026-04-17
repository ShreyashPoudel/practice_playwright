import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';

test('Login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login();
  expect(page.url()).toContain('dashboard');
});
