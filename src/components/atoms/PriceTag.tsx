import { formatPrice } from '../../utils/format';
import styles from './PriceTag.module.css';

type TPriceTagProps = {
  compareAtPrice: number;
  price: number;
  suffix?: string;
  tone?: 'accent' | 'muted';
};

export function PriceTag({ compareAtPrice, price, suffix, tone = 'accent' }: TPriceTagProps) {
  const isFree = price === 0;
  const hasDiscount = compareAtPrice > price;
  const isMuted = tone === 'muted';

  return (
    <span className={styles.priceTag}>
      {hasDiscount ? (
        <span className={`${styles.compareAt} ${isMuted ? styles.compareAtMuted : ''}`}>
          {formatPrice(compareAtPrice)}
          {suffix ? suffix : ''}
        </span>
      ) : null}
      <span className={styles.activeRow}>
        <span className={`${isFree ? styles.free : styles.active} ${isMuted ? styles.activeMuted : ''}`}>
          {isFree ? 'FREE' : formatPrice(price)}
        </span>
        {suffix ? <span className={styles.suffix}>{suffix}</span> : null}
      </span>
    </span>
  );
}
