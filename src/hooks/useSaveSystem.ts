import { useEffect, useState } from 'react';
import { saveState } from '../utils/persistence';
import { useBundleContext } from './useBundleContext';

const CONFIRMATION_DURATION_MS = 2000;

export function useSaveSystem() {
  const { state } = useBundleContext();
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (!justSaved) return;
    const timer = setTimeout(() => setJustSaved(false), CONFIRMATION_DURATION_MS);
    return () => clearTimeout(timer);
  }, [justSaved]);

  function save() {
    saveState(state);
    setJustSaved(true);
  }

  return { save, justSaved };
}
