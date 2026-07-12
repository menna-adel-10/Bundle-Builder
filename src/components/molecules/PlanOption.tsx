import type { TPlan } from '../../types/bundle';
import { PriceTag } from '../atoms/PriceTag';
import styles from './PlanOption.module.css';

type TPlanOptionProps = {
  plan: TPlan;
  isSelected: boolean;
  onSelect: () => void;
};

export function PlanOption({ plan, isSelected, onSelect }: TPlanOptionProps) {
  return (
    <div
      className={`${styles.option} ${isSelected ? styles.optionSelected : ''}`}
      onClick={onSelect}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
    >
      <span className={styles.left}>
        <span className={`${styles.radio} ${isSelected ? styles.radioSelected : ''}`}>
          {isSelected ? <span className={styles.radioDot} /> : null}
        </span>
        <span className={styles.title}>{plan.title}</span>
      </span>
      <PriceTag compareAtPrice={plan.compareAtPrice} price={plan.price} suffix={plan.billingSuffix} />
    </div>
  );
}
