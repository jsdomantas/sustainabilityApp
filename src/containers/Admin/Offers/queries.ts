import { useMutation, useQuery } from 'react-query';
import { createOffer, getStockProducts } from './api';

export const useStockProductsQuery = () =>
  useQuery(['stock', 'products'], getStockProducts);

export const useCreateOfferMutation = () =>
  useMutation(data => createOffer(data));
