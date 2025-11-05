import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Product, productApi, ProductsResponse } from '../services/api';

// Query keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
};

// Hooks for products
export const useProducts = (
  options?: UseQueryOptions<Product[], Error, Product[], ReturnType<typeof productKeys.lists>>
) => {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: async () => {
      const products = await productApi.getProducts();
      return products;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const useProduct = (
  id: number,
  options?: UseQueryOptions<Product, Error, Product, ReturnType<typeof productKeys.detail>>
) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async () => {
      const product = await productApi.getProductById(id);
      return product;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const useSearchProducts = (
  query?: string,
  limit: number = 20,
  skip: number = 0,
  options?: UseQueryOptions<ProductsResponse, Error, ProductsResponse, ReturnType<typeof productKeys.list>>
) => {
  return useQuery({
    queryKey: productKeys.list({ search: query, limit, skip }),
    queryFn: async () => {
      const result = await productApi.searchProducts(query, limit, skip);
      return result;
    },
    enabled: !query || query.length > 2, // Only run if no query or meaningful query
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    ...options,
  });
};
