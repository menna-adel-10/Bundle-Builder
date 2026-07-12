import { STEPS } from '../../data/steps';
import plans from '../../data/plans.json';
import products from '../../data/products.json';
import type { TPlan, TProduct } from '../../types/bundle';
import { TStepId } from '../../types/bundle';
import { useBundleContext } from '../../hooks/useBundleContext';
import { usePlanSelection } from '../../hooks/usePlanSelection';
import { useStepAccordion } from '../../hooks/useStepAccordion';
import { stepSelectedCount } from '../../state/selectors';
import { AccordionStepHeader } from '../molecules/AccordionStepHeader';
import { PlanOption } from '../molecules/PlanOption';
import { ProductCard } from '../molecules/ProductCard';
import styles from './BuilderAccordion.module.css';

const PRODUCTS = products as TProduct[];
const PLANS = plans as TPlan[];

export function BuilderAccordion() {
  const { state } = useBundleContext();
  const { expandedStep, setExpandedStep } = useStepAccordion();
  const { planId, selectPlan } = usePlanSelection();

  return (
    <div className={styles.accordion}>
      {STEPS.map((step) => {
        const isExpanded = expandedStep === step.id;
        const isPlanStep = step.id === TStepId.Plan;
        const selectedCount = isPlanStep
          ? PLANS.filter((plan) => plan.id === planId).length
          : stepSelectedCount(state, PRODUCTS, step.id);
        const nextStep = STEPS.find((candidate) => candidate.id === step.id + 1);

        return (
          <section key={step.id} className={styles.step}>
            <AccordionStepHeader
              step={step}
              isExpanded={isExpanded}
              selectedCount={selectedCount}
              onToggle={() => setExpandedStep(step.id)}
            />
            <div className={`${styles.contentWrapper} ${isExpanded ? styles.contentWrapperOpen : ''}`}>
              <div className={styles.contentInner}>
                <div className={styles.content}>
                  {isPlanStep ? (
                    <div className={styles.planList}>
                      {PLANS.map((plan) => (
                        <PlanOption key={plan.id} plan={plan} isSelected={plan.id === planId} onSelect={() => selectPlan(plan.id)} />
                      ))}
                    </div>
                  ) : (
                    <div className={styles.grid}>
                      {PRODUCTS.filter((product) => product.step === step.id).map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                  {nextStep ? (
                    <button type="button" className={styles.nextButton} onClick={() => setExpandedStep(nextStep.id)}>
                      Next: {nextStep.title}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
