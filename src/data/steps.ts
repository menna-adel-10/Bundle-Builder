import { TStepId } from '../types/bundle';

export type TStepIconName = 'camera' | 'shield' | 'sensor' | 'lock';

export type TStepConfig = {
  id: TStepId;
  title: string;
  icon: TStepIconName;
};

export const STEPS: TStepConfig[] = [
  { id: TStepId.Cameras, title: 'Choose your cameras', icon: 'camera' },
  { id: TStepId.Plan, title: 'Choose your plan', icon: 'shield' },
  { id: TStepId.Sensors, title: 'Choose your sensors', icon: 'sensor' },
  { id: TStepId.Protection, title: 'Add extra protection', icon: 'lock' },
];
