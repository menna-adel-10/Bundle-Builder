import { useBundleContext } from './useBundleContext';

export function usePlanSelection() {
  const { state, dispatch } = useBundleContext();

  function selectPlan(planId: string) {
    dispatch({ type: 'SET_PLAN', planId });
  }

  return { planId: state.planId, selectPlan };
}
