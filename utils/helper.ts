import { expect, type Page } from '@playwright/test';

export async function takeAndCompareScreenshot(page: Page, screenshotName: string): Promise<void> {
  await page.waitForLoadState(`networkidle`);
  await page.waitForTimeout(500);
  await expect.soft(page).toHaveScreenshot(`${screenshotName}.png`, {
    fullPage: true,
  });
}
