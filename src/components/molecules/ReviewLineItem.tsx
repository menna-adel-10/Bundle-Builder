import type { TReviewLineItem } from '../../types/bundle';
import { useProductQuantity } from '../../hooks/useProductQuantity';
import { PriceTag } from '../atoms/PriceTag';
import { QuantityStepper } from '../atoms/QuantityStepper';
import styles from './ReviewLineItem.module.css';

export function ReviewLineItem({ item }: { item: TReviewLineItem }) {
  const { product, variant } = item;
  const { quantity, setQuantity } = useProductQuantity(product, variant?.id);
  const title = variant ? `${product.title} (${variant.label})` : product.title;

  return (
    <div className={styles.row}>
      <img className={styles.thumbnail} src={product.image} alt={title} />
      <span className={styles.title}>{title}</span>
      <QuantityStepper quantity={quantity} onChange={setQuantity} />
      <PriceTag compareAtPrice={product.compareAtPrice} price={product.price} />
    </div>
  );
}
