import { describe, expect, it } from 'vitest';
import { bundleReducer, SEED_STATE, type TBundleState } from './bundleReducer';
import { TStepId } from '../types/bundle';

const baseState: TBundleState = {
  quantities: {},
  selectedVariant: {},
  expandedStep: TStepId.Cameras,
  planId: 'cam-unlimited',
};

describe('bundleReducer', () => {
  it('sets a quantity for a new key', () => {
    const next = bundleReducer(baseState, { type: 'SET_QUANTITY', key: 'wyze-cam-v4:white', quantity: 2 });
    expect(next.quantities['wyze-cam-v4:white']).toBe(2);
  });

  it('clamps negative quantities to zero', () => {
    const next = bundleReducer(baseState, { type: 'SET_QUANTITY', key: 'wyze-cam-v4:white', quantity: -3 });
    expect(next.quantities['wyze-cam-v4:white']).toBe(0);
  });

  it('does not mutate the previous quantities object', () => {
    const withQty: TBundleState = { ...baseState, quantities: { a: 1 } };
    const next = bundleReducer(withQty, { type: 'SET_QUANTITY', key: 'b', quantity: 1 });
    expect(withQty.quantities).toEqual({ a: 1 });
    expect(next.quantities).toEqual({ a: 1, b: 1 });
  });

  it('records the selected variant for a product', () => {
    const next = bundleReducer(baseState, { type: 'SELECT_VARIANT', productId: 'wyze-cam-v4', variantId: 'black' });
    expect(next.selectedVariant['wyze-cam-v4']).toBe('black');
  });

  it('toggles a step closed when re-selecting the already-expanded step', () => {
    const opened = bundleReducer(baseState, { type: 'SET_EXPANDED_STEP', step: TStepId.Cameras });
    expect(opened.expandedStep).toBeNull();
  });

  it('expands a different step', () => {
    const next = bundleReducer(baseState, { type: 'SET_EXPANDED_STEP', step: TStepId.Plan });
    expect(next.expandedStep).toBe(TStepId.Plan);
  });

  it('updates the selected plan', () => {
    const next = bundleReducer(baseState, { type: 'SET_PLAN', planId: 'cam-unlimited-pro' });
    expect(next.planId).toBe('cam-unlimited-pro');
  });

  it('replaces the whole state on hydrate', () => {
    const next = bundleReducer(baseState, { type: 'HYDRATE', state: SEED_STATE });
    expect(next).toBe(SEED_STATE);
  });

  it('returns the same state for an unknown action', () => {
    // @ts-expect-error intentionally invalid action for the default branch
    const next = bundleReducer(baseState, { type: 'NOT_REAL' });
    expect(next).toBe(baseState);
  });
});
