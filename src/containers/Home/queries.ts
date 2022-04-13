import { useMutation, useQuery } from 'react-query';
import { getAllOffers, getOffer, sendOfferAction } from './api';

export const useAllOffersQuery = () =>
  useQuery(['offers', 'all'], getAllOffers);

export const useOfferQuery = (id: number) =>
  useQuery(['offers', id], () => getOffer(id));

export const useOfferActionMutation = () =>
  useMutation((data: { id: number; actionType: 'reserve' | 'complete' }) => {
    return sendOfferAction(data.id, data.actionType);
  });
