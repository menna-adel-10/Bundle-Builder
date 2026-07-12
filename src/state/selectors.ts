import type { TProduct, TReviewLineItem, TStepId } from '../types/bundle';
import { variantKey } from '../utils/variantKey';
import type { TBundleState } from './bundleReducer';

export function getActiveVariantId(state: TBundleState, product: TProduct): string | undefined {
  if (!product.variants) return undefined;
  return state.selectedVariant[product.id] ?? product.defaultVariantId ?? product.variants[0]?.id;
}

export function getQuantity(state: TBundleState, product: TProduct, variantId?: string): number {
  return state.quantities[variantKey(product.id, variantId)] ?? 0;
}

export function getActiveQuantity(state: TBundleState, product: TProduct): number {
  return getQuantity(state, product, getActiveVariantId(state, product));
}

export function stepSelectedCount(state: TBundleState, products: TProduct[], step: TStepId): number {
  return products.filter((product) => {
    if (product.step !== step) return false;
    if (!product.variants) return getQuantity(state, product) > 0;
    return product.variants.some((variant) => getQuantity(state, product, variant.id) > 0);
  }).length;
}

export function reviewLineItems(state: TBundleState, products: TProduct[]): TReviewLineItem[] {
  const items: TReviewLineItem[] = [];
  for (const product of products) {
    if (!product.variants) {
      const quantity = getQuantity(state, product);
      if (quantity > 0) {
        items.push({ key: variantKey(product.id), product, quantity });
      }
      continue;
    }
    for (const variant of product.variants) {
      const quantity = getQuantity(state, product, variant.id);
      if (quantity > 0) {
        items.push({ key: variantKey(product.id, variant.id), product, variant, quantity });
      }
    }
  }
  return items;
}

export function hardwareTotals(lineItems: TReviewLineItem[]): {
  compareAtTotal: number;
  total: number;
  savings: number;
} {
  const compareAtTotal = lineItems.reduce((sum, item) => sum + item.product.compareAtPrice * item.quantity, 0);
  const total = lineItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return { compareAtTotal, total, savings: compareAtTotal - total };
}
