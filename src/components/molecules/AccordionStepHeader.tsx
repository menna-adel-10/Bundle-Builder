import type { TStepConfig } from '../../data/steps';
import { Chevron } from '../atoms/Chevron';
import { StepIcon } from '../atoms/StepIcon';
import styles from './AccordionStepHeader.module.css';

type TAccordionStepHeaderProps = {
  step: TStepConfig;
  isExpanded: boolean;
  selectedCount: number;
  onToggle: () => void;
};

export function AccordionStepHeader({ step, isExpanded, selectedCount, onToggle }: TAccordionStepHeaderProps) {
  return (
    <button type="button" className={styles.header} onClick={onToggle} aria-expanded={isExpanded}>
      <StepIcon src={step.icon} />
      <span className={styles.titleGroup}>
        <span className={`${styles.eyebrow} ${isExpanded ? styles.eyebrowOpen : ''}`}>Step {step.id} of 4</span>
        <span className={styles.title}>{step.title}</span>
      </span>
      <span className={styles.state}>
        {isExpanded ? <span>{selectedCount} selected</span> : null}
        <Chevron direction={isExpanded ? 'up' : 'down'} />
      </span>
    </button>
  );
}
