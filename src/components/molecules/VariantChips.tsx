import type { TVariant } from '../../types/bundle';
import { ColorSwatch } from '../atoms/ColorSwatch';
import styles from './VariantChips.module.css';

type TVariantChipsProps = {
  variants: TVariant[];
  activeVariantId?: string;
  onSelect: (variantId: string) => void;
};

export function VariantChips({ variants, activeVariantId, onSelect }: TVariantChipsProps) {
  return (
    <div className={styles.chips}>
      {variants.map((variant) => (
        <button
          key={variant.id}
          type="button"
          className={`${styles.chip} ${variant.id === activeVariantId ? styles.chipActive : ''}`}
          onClick={() => onSelect(variant.id)}
        >
          {variant.swatchImage ? (
            <img className={styles.swatchImage} src={variant.swatchImage} alt="" />
          ) : (
            <ColorSwatch colorHex={variant.colorHex} />
          )}
          {variant.label}
        </button>
      ))}
    </div>
  );
}
