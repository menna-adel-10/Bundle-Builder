import type { TProduct } from '../types/bundle';
import { getQuantity } from '../state/selectors';
import { variantKey } from '../utils/variantKey';
import { useBundleContext } from './useBundleContext';

export function useProductQuantity(product: TProduct, variantId?: string) {
  const { state, dispatch } = useBundleContext();
  const quantity = getQuantity(state, product, variantId);

  function setQuantity(next: number) {
    dispatch({ type: 'SET_QUANTITY', key: variantKey(product.id, variantId), quantity: next });
  }

  return { quantity, setQuantity };
}
