export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  badge: string;
  stock: number;
};

export type Coupon = {
  code: string;
  description: string;
  amountOff?: number;
  percentOff?: number;
  minimumTotal?: number;
};

export type CartItem = Product & {
  quantity: number;
};
