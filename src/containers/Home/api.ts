import { axiosClient } from '../../axiosConfig';

export const getAllOffers = () => axiosClient.get('/offers').then(r => r.data);

export const getOffer = (id: number) =>
  axiosClient.get(`/offers/details/${id}`).then(r => r.data);

export const sendOfferAction = (
  id: number,
  actionType: 'reserve' | 'complete',
) =>
  axiosClient.post(`/offers/details/${id}/actions`, {
    actionType,
  });
