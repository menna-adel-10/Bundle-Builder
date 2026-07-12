import type { TStepId } from '../types/bundle';
import { useBundleContext } from './useBundleContext';

export function useStepAccordion() {
  const { state, dispatch } = useBundleContext();

  function setExpandedStep(step: TStepId) {
    dispatch({ type: 'SET_EXPANDED_STEP', step });
  }

  return { expandedStep: state.expandedStep, setExpandedStep };
}
