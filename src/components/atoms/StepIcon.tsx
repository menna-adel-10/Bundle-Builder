import type { TStepIconName } from '../../data/steps';

const PATHS: Record<TStepIconName, string> = {
  camera: 'M4 7h2l1-2h6l1 2h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z M12 10a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  shield: 'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z',
  sensor: 'M12 4a8 8 0 0 1 8 8 M12 7a5 5 0 0 1 5 5 M12 10a2 2 0 0 1 2 2',
  lock: 'M7 10V7a5 5 0 0 1 10 0v3 M5 10h14v9H5z',
};

export function StepIcon({ name }: { name: TStepIconName }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d={PATHS[name]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
