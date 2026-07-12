import plans from '../../data/plans.json';
import products from '../../data/products.json';
import shipping from '../../data/shipping.json';
import { TProductCategory, type TPlan, type TProduct } from '../../types/bundle';
import { useBundleContext } from '../../hooks/useBundleContext';
import { useSaveSystem } from '../../hooks/useSaveSystem';
import { hardwareTotals, reviewLineItems } from '../../state/selectors';
import { formatPrice } from '../../utils/format';
import { CATEGORY_LABELS } from '../../utils/categoryLabels';
import { PriceTag } from '../atoms/PriceTag';
import { ReviewLineItem } from '../molecules/ReviewLineItem';
import styles from './ReviewPanel.module.css';

const PRODUCTS = products as TProduct[];
const PLANS = plans as TPlan[];
const FINANCING_MONTHS = 12;

export function ReviewPanel() {
  const { state } = useBundleContext();
  const { save, justSaved } = useSaveSystem();
  const lineItems = reviewLineItems(state, PRODUCTS);
  const { compareAtTotal, total, savings } = hardwareTotals(lineItems);
  const selectedPlan = PLANS.find((plan) => plan.id === state.planId);
  const financingPerMonth = total / FINANCING_MONTHS;

  function handleCheckout() {
    alert('Checkout is a placeholder in this prototype.');
  }

  return (
    <aside className={styles.panel}>
      <h2 className={styles.heading}>Your security system</h2>
      <p className={styles.description}>
        Review your personalized protection system designed to keep what matters most safe.
      </p>

      {Object.values(TProductCategory).map((category) => {
        const items = lineItems.filter((item) => item.product.category === category);
        if (items.length === 0) return null;
        return (
          <div key={category}>
            <h3 className={styles.subheading}>{CATEGORY_LABELS[category]}</h3>
            {items.map((item) => (
              <ReviewLineItem key={item.key} item={item} />
            ))}
          </div>
        );
      })}

      {selectedPlan ? (
        <div>
          <h3 className={styles.subheading}>Plan</h3>
          <div className={styles.row}>
            <span>{selectedPlan.title}</span>
            <PriceTag compareAtPrice={selectedPlan.compareAtPrice} price={selectedPlan.price} suffix={selectedPlan.billingSuffix} />
          </div>
        </div>
      ) : null}

      <div className={styles.row}>
        <span>{shipping.label}</span>
        <PriceTag compareAtPrice={shipping.compareAtPrice} price={shipping.price} />
      </div>

      <p className={styles.badgeRow}>100% Wyze Guarantee — 30-day hassle-free returns</p>
      <p className={styles.financingLine}>As low as {formatPrice(financingPerMonth)}/mo with financing</p>

      <div className={styles.totalRow}>
        <span>
          {compareAtTotal > total ? <span className={styles.totalCompareAt}>{formatPrice(compareAtTotal)}</span> : null}
          <span className={styles.totalActive}>{formatPrice(total)}</span>
        </span>
      </div>
      {savings > 0 ? (
        <p className={styles.savings}>Congrats! You're saving {formatPrice(savings)} on your security system bundle.</p>
      ) : null}

      <button type="button" className={styles.checkoutButton} onClick={handleCheckout}>
        Checkout
      </button>
      <button type="button" className={styles.saveLink} onClick={save}>
        {justSaved ? <span className={styles.savedConfirmation}>Saved!</span> : 'Save my system for later'}
      </button>
    </aside>
  );
}
