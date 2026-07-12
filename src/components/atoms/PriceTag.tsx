import { formatPrice } from '../../utils/format';
import styles from './PriceTag.module.css';

type TPriceTagProps = {
  compareAtPrice: number;
  price: number;
  suffix?: string;
};

export function PriceTag({ compareAtPrice, price, suffix }: TPriceTagProps) {
  const isFree = price === 0;
  const hasDiscount = compareAtPrice > price;

  return (
    <span className={styles.priceTag}>
      {hasDiscount ? <span className={styles.compareAt}>{formatPrice(compareAtPrice)}</span> : null}
      <span className={isFree ? styles.free : styles.active}>{isFree ? 'FREE' : formatPrice(price)}</span>
      {suffix ? <span className={styles.suffix}>{suffix}</span> : null}
    </span>
  );
}
