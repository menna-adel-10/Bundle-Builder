import type { TBundleState } from '../state/bundleReducer';

const STORAGE_KEY = 'bundle-builder-state';

export function loadSavedState(): TBundleState | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as TBundleState;
  } catch {
    return null;
  }
}

export function saveState(state: TBundleState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
