export enum TProductCategory {
  Cameras = 'cameras',
  Sensors = 'sensors',
  Accessories = 'accessories',
}

export enum TStepId {
  Cameras = 1,
  Plan = 2,
  Sensors = 3,
  Protection = 4,
}

export type TVariant = {
  id: string;
  label: string;
  colorHex: string;
  image?: string;
  swatchImage?: string;
};

export type TProduct = {
  id: string;
  category: TProductCategory;
  step: TStepId;
  title: string;
  description: string;
  learnMoreUrl: string;
  image: string;
  badge?: string;
  compareAtPrice: number;
  price: number;
  variants?: TVariant[];
  defaultVariantId?: string;
  required?: boolean;
};

export type TPlan = {
  id: string;
  title: string;
  compareAtPrice: number;
  price: number;
  billingSuffix: string;
};

export type TShippingLine = {
  label: string;
  compareAtPrice: number;
  price: number;
};

export type TReviewLineItem = {
  key: string;
  product: TProduct;
  variant?: TVariant;
  quantity: number;
};
