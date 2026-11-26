import { Page, Locator } from '@playwright/test';
import { step } from '../utils/decorators';

export class CartPage {
  readonly page: Page;
  readonly increaseBackpackQuantityButton: Locator;
  readonly removeHeadphoneButton: Locator;
  readonly cartPromoInput: Locator;
  readonly applyCartPromoButton: Locator;
  readonly cartCheckoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly removePromoCodeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.increaseBackpackQuantityButton = page.getByTestId('cart-increase-sauce-backpack');
    this.removeHeadphoneButton = page.getByTestId('cart-remove-sauce-headphones');
    this.cartPromoInput = page.getByTestId('cart-promo-input');
    this.applyCartPromoButton = page.getByTestId('cart-promo-apply');
    this.cartCheckoutButton = page.getByTestId('cart-checkout-button');
    this.continueShoppingButton = page.getByTestId('cart-continue-shopping');
    this.removePromoCodeButton = page.getByTestId('cart-remove-promo');
  }

  @step
  async applyPromoCode(code: string) {
    await this.cartPromoInput.fill(code);
    await this.applyCartPromoButton.click();
  }

  @step
  async removePromoCode() {
    await this.removePromoCodeButton.click();
  }

  @step
  async goToCheckout() {
    await this.cartCheckoutButton.click();
  }

  @step
  async removeHeadphone() {
    await this.removeHeadphoneButton.click();
  }

  @step
  async increaseBackpackQuantity(quantity: number) {
    for (let i = 0; i < quantity; i++) {
      await this.increaseBackpackQuantityButton.click();
    }
  }

  @step
  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
