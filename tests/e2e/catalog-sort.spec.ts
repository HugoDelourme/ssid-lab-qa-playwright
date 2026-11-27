import { test, expect } from '../../fixtures';
import { takeAndCompareScreenshot } from '../../utils/helper';

test.afterEach(async ({ context }) => {
  await context.close();
});

test(`Cas 4 : Tri de la categorie vetements par prix sur toutes les pages`, async ({
  page,
  catalogPage,
}) => {
  await page.goto('./');
  await catalogPage.selectClothingCategory();

  await catalogPage.orderByPriceDescClothingCategory();
  await takeAndCompareScreenshot(catalogPage.page, `order by price desc`);

  await catalogPage.orderByPriceAscClothingCategory();
  await takeAndCompareScreenshot(catalogPage.page, `order by price asc`);
});
