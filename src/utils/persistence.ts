import type { TBundleState } from '../state/bundleReducer';

const STORAGE_KEY = 'bundle-builder-state';

function isRecordOf(value: unknown, valueType: 'string' | 'number'): value is Record<string, string | number> {
  if (typeof value !== 'object' || value === null) return false;
  return Object.values(value).every((entry) => typeof entry === valueType);
}

function isValidBundleState(value: unknown): value is TBundleState {
  if (typeof value !== 'object' || value === null) return false;
  const state = value as Record<string, unknown>;
  return (
    isRecordOf(state.quantities, 'number') &&
    isRecordOf(state.selectedVariant, 'string') &&
    (state.expandedStep === null || typeof state.expandedStep === 'number') &&
    typeof state.planId === 'string'
  );
}

export function loadSavedState(): TBundleState | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  return isValidBundleState(parsed) ? parsed : null;
}

export function saveState(state: TBundleState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
