import { BuilderAccordion } from './components/organisms/BuilderAccordion';
import { ReviewPanel } from './components/organisms/ReviewPanel';
import styles from './App.module.css';

export function App() {
  return (
    <div className={styles.layout}>
      <h1 className={styles.mobileHeading}>Let&apos;s get started!</h1>
      <BuilderAccordion />
      <ReviewPanel />
    </div>
  );
}
