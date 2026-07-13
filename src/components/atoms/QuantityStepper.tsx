import styles from './QuantityStepper.module.css';

type TQuantityStepperProps = {
  quantity: number;
  onChange: (next: number) => void;
  min?: number;
  isFree?: boolean;
};

export function QuantityStepper({ quantity, onChange, min = 0, isFree = false }: TQuantityStepperProps) {
  const buttonClassName = `${styles.button} ${isFree ? styles.buttonFree : ''}`;

  return (
    <div className={styles.stepper}>
      <button
        type="button"
        className={buttonClassName}
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className={styles.count}>{quantity}</span>
      <button type="button" className={buttonClassName} onClick={() => onChange(quantity + 1)} aria-label="Increase quantity">
        +
      </button>
    </div>
  );
}
