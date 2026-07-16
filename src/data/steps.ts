import { TStepId } from '../types/bundle';

export type TStepConfig = {
  id: TStepId;
  title: string;
  icon: string;
};

export const STEPS: TStepConfig[] = [
  { id: TStepId.Cameras, title: 'Choose your cameras', icon: '/icons/step-sensors.svg' },
  { id: TStepId.Plan, title: 'Choose your plan', icon: '/icons/step-plan.svg' },
  { id: TStepId.Sensors, title: 'Choose your sensors', icon: '/icons/step-cameras.svg' },
  { id: TStepId.Protection, title: 'Add extra protection', icon: '/icons/step-protection.svg' },
];
