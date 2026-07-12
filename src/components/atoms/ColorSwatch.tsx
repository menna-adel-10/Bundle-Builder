import styles from './ColorSwatch.module.css';

export function ColorSwatch({ colorHex }: { colorHex: string }) {
  return <span className={styles.swatch} style={{ backgroundColor: colorHex }} />;
}
