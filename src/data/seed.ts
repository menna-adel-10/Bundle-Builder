import { TStepId } from '../types/bundle';

export const SEED_QUANTITIES: Record<string, number> = {
  'wyze-cam-v4:white': 1,
  'wyze-cam-pan-v3:white': 2,
  'wyze-sense-motion-sensor': 2,
  'wyze-sense-hub': 1,
  'wyze-microsd-card-256gb': 2,
};

export const SEED_SELECTED_VARIANTS: Record<string, string> = {
  'wyze-cam-v4': 'white',
  'wyze-cam-pan-v3': 'white',
  'wyze-cam-floodlight-v2': 'white',
  'wyze-battery-cam-pro': 'white',
};

export const SEED_PLAN_ID = 'cam-unlimited';

export const SEED_EXPANDED_STEP: TStepId = TStepId.Cameras;
