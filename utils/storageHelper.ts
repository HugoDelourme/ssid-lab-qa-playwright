import { Page } from '@playwright/test';

export async function injectCartInStorage(page: Page, cartPayload: unknown) {
  await page.addInitScript((data) => {
    window.localStorage.setItem('cart-storage', JSON.stringify(data));
  }, cartPayload);
}
