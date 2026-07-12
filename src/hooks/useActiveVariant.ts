import type { TProduct } from '../types/bundle';
import { getActiveVariantId } from '../state/selectors';
import { useBundleContext } from './useBundleContext';

export function useActiveVariant(product: TProduct) {
  const { state, dispatch } = useBundleContext();
  const activeVariantId = getActiveVariantId(state, product);

  function selectVariant(variantId: string) {
    dispatch({ type: 'SELECT_VARIANT', productId: product.id, variantId });
  }

  return { activeVariantId, selectVariant };
}
