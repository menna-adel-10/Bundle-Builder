# Bundle Builder

A data-driven React prototype of a multi-step security-system bundle builder with a live review panel, built as a frontend take-home exercise.

## Run instructions

```bash
npm install
npm run dev      # starts the Vite dev server
npm run build    # type-checks and produces a production build in dist/
npm run preview  # serves the production build locally
```

Requires Node 18+.

## Architecture

- **Vite + React + TypeScript**, no UI framework — everything is hand-built with CSS Modules for full control over spacing, typography, and states.
- **Atomic design** component structure under `src/components/`:
  - `atoms/` — QuantityStepper, PriceTag, Badge, ColorSwatch, Chevron, StepIcon
  - `molecules/` — ProductCard, ReviewLineItem, VariantChips, AccordionStepHeader, PlanOption
  - `organisms/` — BuilderAccordion, ReviewPanel
- **Data-driven**: all products, plans, shipping, and step config live in `src/data/*.json` / `src/data/steps.ts`. No component hardcodes per-product markup — `ProductCard` and `ReviewLineItem` render entirely from a `TProduct` record.
- **State**: a single reducer-backed context (`src/state/BundleContext.tsx`, `bundleReducer.ts`) holds quantities (keyed per product or per variant), the active variant per product, the expanded accordion step, and the selected plan. Pure selector functions in `src/state/selectors.ts` derive the "N selected" counts, review-panel line items, and totals from that one source of truth — this is what keeps product-card steppers and review-panel steppers in sync automatically.
- **Types**: all domain types live in `src/types/bundle.ts`, prefixed `T` (`TProduct`, `TVariant`, `TReviewLineItem`, etc.), with closed value sets (`TProductCategory`, `TStepId`) as enums rather than raw strings.
- **Hooks**: `src/hooks/` wraps the store for components (`useProductQuantity`, `useActiveVariant`, `useStepAccordion`, `usePlanSelection`, `useSaveSystem`).
- **Persistence**: "Save my system for later" writes the full bundle state to `localStorage` (`src/utils/persistence.ts`). On load, the app hydrates from localStorage if present, otherwise falls back to a seed state (`src/data/seed.ts`) that reproduces the design's initial screenshot.

## Decisions & tradeoffs

- **No backend**: product/plan/shipping data is served from local JSON files under `src/data/`, per the assignment's "local JSON file is completely fine" allowance. The optional backend bonus was skipped to focus effort on the graded builder/review-panel/persistence requirements.
- **Placeholder product images**: since there's no Figma asset export available, product photos are simple generated SVG placeholders under `public/products/`.
- **Review-panel steppers**: every review-panel line (including pre-seeded sensors/accessory) has a live, working quantity stepper wired to the same store as the product card, per the explicit "kept in sync" interaction requirement — even though the seed screenshot shows those steps collapsed.
- **Checkout**: a placeholder `alert()` confirmation, as explicitly allowed by the brief.
- **Variant chip active styling**: intentionally left unstyled/minimal per the spec's note not to worry about chip highlighting — the selection-and-quantity behavior is fully wired, just not visually indicated on the chip itself.
