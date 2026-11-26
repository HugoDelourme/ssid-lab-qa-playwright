import { Page, Locator } from '@playwright/test';
import { step } from '../utils/decorators';

export class CheckoutPage {
  readonly page: Page;
  readonly cardNumberInput: Locator;
  readonly cardExpiryInput: Locator;
  readonly cardCvcInput: Locator;
  readonly paymentNameInput: Locator;
  readonly paymentSubmitButton: Locator;
  readonly checkoutFirstNameInput: Locator;
  readonly checkoutLastNameInput: Locator;
  readonly checkoutEmailInput: Locator;
  readonly checkoutPostalCodeInput: Locator;
  readonly checkoutDeliveryExpressRadio: Locator;
  readonly checkoutContinueButton: Locator;
  readonly checkoutBackButton: Locator;
  readonly checkoutRecapBackButton: Locator;
  readonly checkoutFinishButton: Locator;
  readonly paymentErrorDeclined: Locator;
  readonly paymentAcceptedConfirmationTitle: Locator;
  readonly returnToCatalogButton: Locator;
  readonly returnToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cardNumberInput = page.getByTestId('payment-card-number');
    this.cardExpiryInput = page.getByTestId('payment-expiry');
    this.cardCvcInput = page.getByTestId('payment-cvc');
    this.paymentNameInput = page.getByTestId('payment-name');
    this.paymentSubmitButton = page.getByTestId('payment-submit');
    this.checkoutFirstNameInput = page.getByTestId('checkout-first-name');
    this.checkoutLastNameInput = page.getByTestId('checkout-last-name');
    this.checkoutEmailInput = page.getByTestId('checkout-email');
    this.checkoutPostalCodeInput = page.getByTestId('checkout-postal-code');
    this.checkoutDeliveryExpressRadio = page.getByTestId('delivery-express');
    this.checkoutContinueButton = page.getByTestId('checkout-continue');
    this.checkoutBackButton = page.getByTestId('checkout-review-back');
    this.checkoutRecapBackButton = page.getByTestId('payment-back');
    this.checkoutFinishButton = page.getByTestId('checkout-finish');
    this.paymentErrorDeclined = page.getByTestId('payment-error-declined');
    this.paymentAcceptedConfirmationTitle = page.getByTestId('confirmation-title');
    this.returnToCatalogButton = page.getByTestId('confirmation-home');
    this.returnToCartButton = page.getByTestId('checkout-cancel');
  }

  @step
  async payWithCard(cardNumber: string, name: string) {
    await this.cardNumberInput.fill(cardNumber);
    await this.cardCvcInput.fill('123');
    await this.paymentNameInput.fill(name);
    await this.cardExpiryInput.fill('12/34');
    await this.paymentSubmitButton.click();
  }

  @step
  async returnToCheckout() {
    await this.checkoutBackButton.click();
  }

  @step
  async submitPayment() {
    await this.paymentSubmitButton.click();
  }

  @step
  async returnToRecapCheckout() {
    await this.checkoutRecapBackButton.click();
  }

  @step
  async finishCheckout() {
    await this.checkoutFinishButton.click();
  }

  @step
  async continueCheckout() {
    await this.checkoutContinueButton.click();
  }

  @step
  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    email: string,
    postalCode: string
  ) {
    await this.checkoutFirstNameInput.fill(firstName);
    await this.checkoutLastNameInput.fill(lastName);
    await this.checkoutEmailInput.fill(email);
    await this.checkoutPostalCodeInput.fill(postalCode);
  }

  @step
  async selectExpressShipping() {
    await this.checkoutDeliveryExpressRadio.check();
  }
  @step
  async returnToCatalog() {
    await this.returnToCatalogButton.click();
  }

  @step
  async returnToCart() {
    await this.returnToCartButton.click();
  }
}
