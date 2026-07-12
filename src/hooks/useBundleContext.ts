import { useContext } from 'react';
import { BundleContext, type TBundleContextValue } from '../state/BundleContext';

export function useBundleContext(): TBundleContextValue {
  const context = useContext(BundleContext);
  if (!context) {
    throw new Error('useBundleContext must be used within a BundleProvider');
  }
  return context;
}
