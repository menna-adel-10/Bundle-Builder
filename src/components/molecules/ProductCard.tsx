import type { TProduct } from '../../types/bundle';
import { useActiveVariant } from '../../hooks/useActiveVariant';
import { useProductQuantity } from '../../hooks/useProductQuantity';
import { Badge } from '../atoms/Badge';
import { PriceTag } from '../atoms/PriceTag';
import { QuantityStepper } from '../atoms/QuantityStepper';
import { VariantChips } from './VariantChips';
import styles from './ProductCard.module.css';

export function ProductCard({ product }: { product: TProduct }) {
  const { activeVariantId, selectVariant } = useActiveVariant(product);
  const { quantity, setQuantity } = useProductQuantity(product, activeVariantId);
  const activeVariant = product.variants?.find((variant) => variant.id === activeVariantId);
  const image = activeVariant?.image ?? product.image;

  return (
    <div className={`${styles.card} ${quantity > 0 ? styles.cardSelected : ''}`}>
      {product.badge ? <Badge label={product.badge} /> : null}
      <img className={styles.image} src={image} alt={product.title} />
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.description}>
          {product.description}{' '}
          <a
            className={styles.learnMore}
            href={product.learnMoreUrl}
            onClick={(event) => {
              if (product.learnMoreUrl === '#') event.preventDefault();
            }}
          >
            Learn More
          </a>
        </p>
        {product.variants ? (
          <VariantChips variants={product.variants} activeVariantId={activeVariantId} onSelect={selectVariant} />
        ) : null}
        <div className={styles.footer}>
          <QuantityStepper
            quantity={quantity}
            onChange={setQuantity}
            isFree={product.price === 0}
            min={product.required ? 1 : 0}
          />
          <PriceTag compareAtPrice={product.compareAtPrice} price={product.price} />
        </div>
      </div>
    </div>
  );
}
