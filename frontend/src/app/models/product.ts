export interface Product {
  id: number;
  name: string;
  price: number;
  created_at?: string;
}

export interface ProductPayload {
  name: string;
  price: number;
}
