import { useMutation, useQuery } from 'react-query';
import {
  createOffer,
  getCreatedOffer,
  getCreatedOffers,
  getStockProducts,
} from './api';

export const useStockProductsQuery = () =>
  useQuery(['stock', 'products'], getStockProducts);

export const useCreateOfferMutation = () =>
  useMutation(data => createOffer(data));

export const useCreatedOffersQuery = () =>
  useQuery(['offers', 'created'], getCreatedOffers);

export const useCreatedOfferQuery = (id: number) =>
  useQuery(['offers', 'created', id], () => getCreatedOffer(id));
