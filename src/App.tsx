import { BuilderAccordion } from './components/organisms/BuilderAccordion';
import { ReviewPanel } from './components/organisms/ReviewPanel';
import styles from './App.module.css';

export function App() {
  return (
    <div className={styles.layout}>
      <BuilderAccordion />
      <ReviewPanel />
    </div>
  );
}
