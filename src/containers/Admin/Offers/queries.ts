import { useQuery } from 'react-query';
import { getStockProducts } from './api';

export const useStockProductsQuery = () =>
  useQuery(['stock', 'products'], getStockProducts);
