import type { TReviewLineItem } from '../../types/bundle';
import { useProductQuantity } from '../../hooks/useProductQuantity';
import { PriceTag } from '../atoms/PriceTag';
import { QuantityStepper } from '../atoms/QuantityStepper';
import styles from './ReviewLineItem.module.css';

export function ReviewLineItem({ item }: { item: TReviewLineItem }) {
  const { product, variant } = item;
  const { quantity, setQuantity } = useProductQuantity(product, variant?.id);
  const title = product.title;
  const image = variant?.image ?? product.image;

  return (
    <div className={styles.row}>
      <img className={styles.thumbnail} src={image} alt={title} />
      <span className={styles.title}>{title}</span>
      <span className={styles.stepperCol}>
        <QuantityStepper
          quantity={quantity}
          onChange={setQuantity}
          isFree={product.price === 0}
          min={product.required ? 1 : 0}
        />
      </span>
      <span className={styles.priceCol}>
        <PriceTag compareAtPrice={product.compareAtPrice} price={product.price} />
      </span>
    </div>
  );
}
