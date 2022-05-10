import { useMutation, useQuery } from 'react-query';
import {
  getAllOffers,
  getOffer,
  getRecommendedOffers,
  searchOffers,
  sendDeviceToken,
  sendOfferAction,
} from './api';
import { queryClient } from '../../utilities/reactQuery';

export const useAllOffersQuery = (parameters: any) =>
  useQuery(['offers', 'all'], () => getAllOffers(parameters), {
    enabled: false,
  });

export const useRecommendedOffersQuery = () =>
  useQuery(['offers', 'recommended'], () => getRecommendedOffers());

export const useSearchOffersQuery = (searchQuery: string) =>
  useQuery(['offers', 'search', searchQuery], () => searchOffers(searchQuery), {
    enabled: !!searchQuery,
  });

export const useOfferQuery = (id: number) =>
  useQuery(['offers', id], () => getOffer(id));

export const useOfferActionMutation = () =>
  useMutation(
    (data: { id: number; actionType: 'reserve' | 'complete' }) => {
      return sendOfferAction(data.id, data.actionType);
    },
    {
      onSuccess: async () => {
        await queryClient.refetchQueries(['offers', 'all']);
      },
    },
  );

export const useDeviceTokenMutation = () =>
  useMutation((data: string) => {
    console.log('here');
    return sendDeviceToken(data);
  });
