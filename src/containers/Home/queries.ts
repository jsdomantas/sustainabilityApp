import { useQuery } from 'react-query';
import { getAllOffers, getOffer } from './api';

export const useAllOffersQuery = () =>
  useQuery(['offers', 'all'], getAllOffers);

export const useOfferQuery = (id: number) =>
  useQuery(['offers', id], () => getOffer(id));
