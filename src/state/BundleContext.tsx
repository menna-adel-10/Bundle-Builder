import { createContext, useReducer, type Dispatch, type ReactNode } from 'react';
import { bundleReducer, SEED_STATE, type TBundleAction, type TBundleState } from './bundleReducer';
import { loadSavedState } from '../utils/persistence';

export type TBundleContextValue = {
  state: TBundleState;
  dispatch: Dispatch<TBundleAction>;
};

export const BundleContext = createContext<TBundleContextValue | null>(null);

function initState(): TBundleState {
  return loadSavedState() ?? SEED_STATE;
}

export function BundleProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bundleReducer, undefined, initState);

  return <BundleContext.Provider value={{ state, dispatch }}>{children}</BundleContext.Provider>;
}
