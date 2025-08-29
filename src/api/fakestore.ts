import type { Product } from '../lib/types';

const BASE_URL = 'https://fakestoreapi.com';

export async function fetchProducts(): Promise<Product[]> {
      const response = await fetch(`${BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
}
export async function fetchCategories(): Promise<Product[]> {
      const response = await fetch(`${BASE_URL}/products/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
}