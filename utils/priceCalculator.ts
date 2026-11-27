export interface CartItem {
  unitPrice: number;
  quantity: number;
}

const round = (n: number) => Math.round(n * 100) / 100;

export function calculateExpectedSummary(
  items: CartItem[],
  discountPercent: number,
  shippingCost: number,
  vatRate = 0.2
) {
  const subtotal = round(items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0));
  const discount = round(subtotal * (discountPercent / 100));
  const afterDiscount = round(subtotal - discount);
  const vat = round(afterDiscount - afterDiscount / (1 + vatRate));
  const total = round(afterDiscount + shippingCost);

  if (shippingCost > 0) {
    return { subtotal, discount, vat, shipping: shippingCost, total };
  }
  return { subtotal, discount, vat, total };
}
