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

const DESKTOP_VIEWPORT = { width: 1920, height: 1080 };

const CHROME_DESKTOP = {
  ...devices['Desktop Chrome'],
  viewport: DESKTOP_VIEWPORT,
};

const FIREFOX_DESKTOP = {
  ...devices['Desktop Firefox'],
  viewport: DESKTOP_VIEWPORT,
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
        ...CHROME_DESKTOP,
        storageState: AUTH_FILES.jean_dupont,
      },
    },
    {
      name: 'e2e-firefox',
      testMatch: /tests\/e2e\/.*\.spec\.ts/,
      dependencies: ['setup'],
      use: { ...FIREFOX_DESKTOP, storageState: AUTH_FILES.jean_dupont },
    },
    {
      name: 'multi-jean_dupont',
      testMatch: /tests\/multi-account\/.*\.spec\.ts/,
      dependencies: ['setup'],
      use: { ...CHROME_DESKTOP, storageState: AUTH_FILES.jean_dupont },
    },
    {
      name: 'multi-client_chaos',
      testMatch: /tests\/multi-account\/.*\.spec\.ts/,
      dependencies: ['setup'],
      use: { ...CHROME_DESKTOP, storageState: AUTH_FILES.client_chaos },
    },
    {
      name: 'multi-tortue_du_web',
      testMatch: /tests\/multi-account\/.*\.spec\.ts/,
      dependencies: ['setup'],
      timeout: 60_000,
      use: { ...CHROME_DESKTOP, storageState: AUTH_FILES.tortue_du_web },
    },
    {
      name: 'bugs',
      testMatch: /tests\/bugs\/.*\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        ...CHROME_DESKTOP,
        storageState: AUTH_FILES.jean_dupont,
      },
    },
  ],
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: process.env.BASE_URL || 'https://ssid-testing-agency.github.io/Lab.qa/',
    ignoreHTTPSErrors: process.env.IGNORE_HTTPS_ERRORS === 'true',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  snapshotPathTemplate: `screenshots/{projectName}/{platform}/{testFilePath}/{arg}{ext}`,
});
