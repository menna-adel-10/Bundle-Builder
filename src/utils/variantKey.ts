export function variantKey(productId: string, variantId?: string): string {
  return variantId ? `${productId}:${variantId}` : productId;
}
