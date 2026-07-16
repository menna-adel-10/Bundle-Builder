import styles from './Badge.module.css';

export function Badge({ label }: { label: string }) {
  return <span className={styles.badge}>{label}</span>;
}
