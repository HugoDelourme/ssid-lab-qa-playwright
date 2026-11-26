import { Page, Locator } from '@playwright/test';
import { step } from '../utils/decorators';

export class CatalogPage {
  readonly page: Page;
  readonly sidebarCategoryClothing: Locator;
  readonly sidebarCategoryAccessories: Locator;
  readonly sidebarCategoryElectronics: Locator;
  readonly shirtSizeLButton: Locator;
  readonly addToCartShirtButton: Locator;
  readonly addToCartBackpackButton: Locator;
  readonly addToCartHeadphoneButton: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebarCategoryClothing = page.getByTestId('sidebar-category-clothing');
    this.sidebarCategoryAccessories = page.getByTestId('sidebar-category-accessories');
    this.sidebarCategoryElectronics = page.getByTestId('sidebar-category-electronics');
    this.shirtSizeLButton = page.getByTestId('size-btn-sauce-bolt-shirt-L');
    this.addToCartShirtButton = page.getByTestId('add-to-cart-sauce-bolt-shirt');
    this.addToCartBackpackButton = page.getByTestId('add-to-cart-sauce-backpack');
    this.addToCartHeadphoneButton = page.getByTestId('add-to-cart-sauce-headphones');
    this.cartIcon = page.getByTestId('cart-icon');
  }

  @step
  async addShirtToCart() {
    await this.sidebarCategoryClothing.click();
    await this.shirtSizeLButton.click();
    await this.addToCartShirtButton.click();
  }

  @step
  async addBackpackToCart() {
    await this.sidebarCategoryAccessories.click();
    await this.addToCartBackpackButton.click();
  }

  @step
  async addHeadphoneToCart() {
    await this.sidebarCategoryElectronics.click();
    await this.addToCartHeadphoneButton.click();
  }

  @step
  async goToCart() {
    await this.cartIcon.click();
  }
}
