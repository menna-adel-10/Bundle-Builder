# Bundle Builder

A data-driven React prototype of a multi-step security-system bundle builder with a live review panel, built as a frontend take-home exercise.

## Run instructions

```bash
npm install
npm run dev      # starts the Vite dev server
npm run build    # type-checks and produces a production build in dist/
npm run preview  # serves the production build locally
npm run lint     # ESLint (TypeScript + React), 0 errors expected
npm run test     # vitest unit tests for the reducer/selectors
```

Requires Node 20+ (ESLint's dependency tree warns below Node 20.19, though it still runs on 20.18).

## Architecture

- **Vite + React + TypeScript**, no UI framework — everything is hand-built with CSS Modules for full control over spacing, typography, and states.
- **Atomic design** component structure under `src/components/`:
  - `atoms/` — QuantityStepper, PriceTag, Badge, ColorSwatch, Chevron, StepIcon
  - `molecules/` — ProductCard, ReviewLineItem, VariantChips, AccordionStepHeader, PlanOption
  - `organisms/` — BuilderAccordion, ReviewPanel
- **Data-driven**: all products, plans, shipping, and step config live in `src/data/*.json` / `src/data/steps.ts`. No component hardcodes per-product markup — `ProductCard` and `ReviewLineItem` render entirely from a `TProduct` record.
- **State**: a single reducer-backed context (`src/state/BundleContext.tsx`, `bundleReducer.ts`) holds quantities (keyed per product or per variant), the active variant per product, the expanded accordion step, and the selected plan. Pure selector functions in `src/state/selectors.ts` derive the "N selected" counts, review-panel line items, and totals from that one source of truth — this is what keeps product-card steppers and review-panel steppers in sync automatically. Both the reducer and selectors have unit test coverage (`src/state/*.test.ts`).
- **Types**: all domain types live in `src/types/bundle.ts`, prefixed `T` (`TProduct`, `TVariant`, `TReviewLineItem`, etc.), with closed value sets (`TProductCategory`, `TStepId`) as enums rather than raw strings.
- **Hooks**: `src/hooks/` wraps the store for components (`useBundleContext`, `useProductQuantity`, `useActiveVariant`, `useStepAccordion`, `usePlanSelection`, `useSaveSystem`).
- **Persistence**: "Save my system for later" writes the full bundle state to `localStorage` (`src/utils/persistence.ts`). On load, the app hydrates from localStorage if the saved value's shape validates as `TBundleState`; otherwise (missing, corrupted, or schema-mismatched) it falls back to a seed state (`src/data/seed.ts`) that reproduces the design's initial screenshot.

## Responsive layout

Three explicit tiers, implemented with CSS `@container` queries (component-local) layered on top of viewport `@media` breakpoints (page-level):

- **Mobile (<560px)**: everything stacked in a single column — accordion above, review summary below.
- **Tablet portrait (560–1024px)**: still a single page column (accordion above the review panel), but the panel itself switches to a two-column internal layout (line items beside the guarantee/price block) and the product grid widens.
- **Desktop / tablet landscape (≥1024px)**: two-column page layout — accordion on the left, a narrow review panel sticky-positioned on the right.

## Decisions & tradeoffs

- **No backend**: product/plan/shipping data is served from local JSON files under `src/data/`, per the assignment's "local JSON file is completely fine" allowance. The optional backend bonus was skipped to focus effort on the graded builder/review-panel/persistence requirements.
- **Product images**: every product and color variant (Cam v4 in White/Grey/Black, Cam Pan v3, Floodlight v2, Duo Cam Doorbell, Battery Cam Pro, Motion Sensor, Sense Hub, MicroSD Card) uses a real product photo, plus the real "100% Wyze Guarantee" badge in the review panel. Variant chips show a real per-color thumbnail where one exists and fall back to a plain color-dot swatch otherwise.
- **Variant chip active styling**: selected chips get a distinct accent border and tinted background (`VariantChips.module.css`) so the active color reads clearly at a glance.
- **Review-panel steppers**: every review-panel line (including pre-seeded sensors/accessory) has a live, working quantity stepper wired to the same store as the product card, per the explicit "kept in sync" interaction requirement — even though the seed screenshot shows those steps collapsed.
- **Checkout**: a placeholder `alert()` confirmation, as explicitly allowed by the brief.
- **Accessibility**: `PlanOption` uses `role="radio"`/`aria-checked` inside a `role="radiogroup"` list and responds to Enter/Space, not just click, since it's a custom (non-native) radio control.
- **Tooling**: a real ESLint flat config (TypeScript + React Hooks + React Refresh rules) backs `npm run lint`, and vitest covers the pure state logic (`bundleReducer`, `selectors`) rather than leaving the reducer/selector split unverified.
