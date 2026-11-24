import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { devices } from '@playwright/test';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  expect: {
    timeout: 10000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
    },
  },
  projects: [
    {
      name: 'auth',
      testMatch: /tests\/auth\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL || 'https://ssid-testing-agency.github.io/Lab.qa/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  snapshotPathTemplate: `screenshots/{testFilePath}/{arg}{ext}`,
});
