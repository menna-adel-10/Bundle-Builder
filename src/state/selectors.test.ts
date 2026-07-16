import { describe, expect, it } from 'vitest';
import {
  getActiveQuantity,
  getActiveVariantId,
  getQuantity,
  hardwareTotals,
  reviewLineItems,
  stepSelectedCount,
} from './selectors';
import type { TBundleState } from './bundleReducer';
import { TProductCategory, TStepId, type TProduct } from '../types/bundle';

const camera: TProduct = {
  id: 'wyze-cam-v4',
  category: TProductCategory.Cameras,
  step: TStepId.Cameras,
  title: 'Wyze Cam v4',
  description: '',
  learnMoreUrl: '#',
  image: '/img.png',
  compareAtPrice: 35.98,
  price: 27.98,
  variants: [
    { id: 'white', label: 'White', colorHex: '#fff' },
    { id: 'black', label: 'Black', colorHex: '#000' },
  ],
  defaultVariantId: 'white',
};

const microSd: TProduct = {
  id: 'wyze-microsd',
  category: TProductCategory.Accessories,
  step: TStepId.Protection,
  title: 'Wyze MicroSD Card',
  description: '',
  learnMoreUrl: '#',
  image: '/img.png',
  compareAtPrice: 20.98,
  price: 20.98,
};

function stateWith(quantities: Record<string, number>, selectedVariant: Record<string, string> = {}): TBundleState {
  return { quantities, selectedVariant, expandedStep: null, planId: 'cam-unlimited' };
}

describe('getActiveVariantId', () => {
  it('returns undefined for a product with no variants', () => {
    expect(getActiveVariantId(stateWith({}), microSd)).toBeUndefined();
  });

  it('falls back to defaultVariantId when nothing is selected', () => {
    expect(getActiveVariantId(stateWith({}), camera)).toBe('white');
  });

  it('prefers the explicitly selected variant', () => {
    const state = stateWith({}, { 'wyze-cam-v4': 'black' });
    expect(getActiveVariantId(state, camera)).toBe('black');
  });
});

describe('getQuantity / getActiveQuantity', () => {
  it('returns 0 for an untouched key', () => {
    expect(getQuantity(stateWith({}), microSd)).toBe(0);
  });

  it('reads the quantity for the active variant', () => {
    const state = stateWith({ 'wyze-cam-v4:black': 2 }, { 'wyze-cam-v4': 'black' });
    expect(getActiveQuantity(state, camera)).toBe(2);
  });
});

describe('stepSelectedCount', () => {
  it('counts a variant product only if some variant has quantity > 0', () => {
    const state = stateWith({ 'wyze-cam-v4:white': 1 });
    expect(stepSelectedCount(state, [camera, microSd], TStepId.Cameras)).toBe(1);
  });

  it('does not count products from other steps', () => {
    const state = stateWith({ 'wyze-cam-v4:white': 1, 'wyze-microsd': 1 });
    expect(stepSelectedCount(state, [camera, microSd], TStepId.Protection)).toBe(1);
  });
});

describe('reviewLineItems', () => {
  it('emits one line item per variant with quantity > 0', () => {
    const state = stateWith({ 'wyze-cam-v4:white': 1, 'wyze-cam-v4:black': 2 });
    const items = reviewLineItems(state, [camera]);
    expect(items).toHaveLength(2);
    expect(items.map((item) => item.quantity)).toEqual([1, 2]);
  });

  it('omits variants with zero quantity', () => {
    const state = stateWith({ 'wyze-cam-v4:white': 0, 'wyze-cam-v4:black': 1 });
    const items = reviewLineItems(state, [camera]);
    expect(items).toHaveLength(1);
    expect(items[0].variant?.id).toBe('black');
  });

  it('handles a variant-less product as a single line item', () => {
    const state = stateWith({ 'wyze-microsd': 3 });
    const items = reviewLineItems(state, [microSd]);
    expect(items).toEqual([{ key: 'wyze-microsd', product: microSd, quantity: 3 }]);
  });
});

describe('hardwareTotals', () => {
  it('sums compareAt and active totals and derives savings', () => {
    const items = reviewLineItems(stateWith({ 'wyze-cam-v4:white': 2, 'wyze-microsd': 1 }), [camera, microSd]);
    const totals = hardwareTotals(items);
    expect(totals.compareAtTotal).toBeCloseTo(35.98 * 2 + 20.98);
    expect(totals.total).toBeCloseTo(27.98 * 2 + 20.98);
    expect(totals.savings).toBeCloseTo(totals.compareAtTotal - totals.total);
  });

  it('returns zeros for an empty cart', () => {
    expect(hardwareTotals([])).toEqual({ compareAtTotal: 0, total: 0, savings: 0 });
  });
});
