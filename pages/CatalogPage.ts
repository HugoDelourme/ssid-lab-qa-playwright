import { Page, Locator } from '@playwright/test';
import { step } from '../utils/decorators';
import { expect } from '../fixtures';

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
  readonly sortSelect: Locator;
  readonly productPrices: Locator;
  readonly nextPageButton: Locator;
  readonly productGrid: Locator;

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
    this.sortSelect = page.getByTestId('sort-select');
    this.nextPageButton = page.getByTestId('pagination-next');
    this.productPrices = page.getByTestId(/^product-price-/);
    this.productGrid = page.getByTestId('product-grid');
  }

  @step
  async addShirtToCart() {
    await this.sidebarCategoryClothing.click();
    await this.shirtSizeLButton.click();
    await this.addToCartShirtButton.click();
  }

  @step
  async selectClothingCategory() {
    await this.sidebarCategoryClothing.click();
  }

  @step
  async orderByPriceAscClothingCategory() {
    await this.sortSelect.selectOption('price-asc');
  }

  @step
  async orderByPriceDescClothingCategory() {
    await this.sortSelect.selectOption('price-desc');
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

  async getAllPricesAcrossPages(): Promise<number[]> {
    const allPrices: number[] = [];

    while (true) {
      await expect(this.productPrices.first()).toBeVisible();
      const priceTexts = await this.productPrices.allTextContents();

      for (const text of priceTexts) {
        const cleaned = parseFloat(text.replace(/[^0-9.,]/g, '').replace(',', '.'));
        if (!Number.isNaN(cleaned)) {
          allPrices.push(cleaned);
        }
      }

      const hasNext =
        (await this.nextPageButton.isVisible()) && (await this.nextPageButton.isEnabled());

      if (!hasNext) {
        break;
      }

      await this.nextPageButton.click();
    }

    return allPrices;
  }
}
