import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { devices } from '@playwright/test';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export const AUTH_FILES = {
  jean_dupont: path.resolve(__dirname, 'playwright/.auth/jean_dupont.json'),
  client_chaos: path.resolve(__dirname, 'playwright/.auth/client_chaos.json'),
  tortue_du_web: path.resolve(__dirname, 'playwright/.auth/tortue_du_web.json'),
};

export default defineConfig({
  expect: {
    timeout: 10000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.001,
    },
  },
  projects: [
    {
      name: 'auth',
      testMatch: /tests\/auth\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: {
          height: 1080,
          width: 1920,
        },
      },
    },
    {
      name: 'setup',
      testMatch: /tests\/setup\/.*\.setup\.ts/,
    },
    {
      name: 'e2e-chromium',
      testMatch: /tests\/e2e\/.*\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: AUTH_FILES.jean_dupont,
        viewport: {
          height: 1080,
          width: 1920,
        },
      },
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
