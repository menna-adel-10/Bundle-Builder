import { TStepId } from '../types/bundle';
import { SEED_EXPANDED_STEP, SEED_PLAN_ID, SEED_QUANTITIES, SEED_SELECTED_VARIANTS } from '../data/seed';

export type TBundleState = {
  quantities: Record<string, number>;
  selectedVariant: Record<string, string>;
  expandedStep: TStepId;
  planId: string;
};

export const SEED_STATE: TBundleState = {
  quantities: SEED_QUANTITIES,
  selectedVariant: SEED_SELECTED_VARIANTS,
  expandedStep: SEED_EXPANDED_STEP,
  planId: SEED_PLAN_ID,
};

export type TBundleAction =
  | { type: 'SET_QUANTITY'; key: string; quantity: number }
  | { type: 'SELECT_VARIANT'; productId: string; variantId: string }
  | { type: 'SET_EXPANDED_STEP'; step: TStepId }
  | { type: 'SET_PLAN'; planId: string }
  | { type: 'HYDRATE'; state: TBundleState };

export function bundleReducer(state: TBundleState, action: TBundleAction): TBundleState {
  switch (action.type) {
    case 'SET_QUANTITY': {
      const quantity = Math.max(0, action.quantity);
      return {
        ...state,
        quantities: { ...state.quantities, [action.key]: quantity },
      };
    }
    case 'SELECT_VARIANT':
      return {
        ...state,
        selectedVariant: { ...state.selectedVariant, [action.productId]: action.variantId },
      };
    case 'SET_EXPANDED_STEP':
      return { ...state, expandedStep: action.step };
    case 'SET_PLAN':
      return { ...state, planId: action.planId };
    case 'HYDRATE':
      return action.state;
    default:
      return state;
  }
}
