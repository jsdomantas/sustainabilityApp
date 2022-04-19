import { axiosClient } from '../../axiosConfig';

export const getAllOffers = parameters => {
  return axiosClient
    .get(`/offers?lat=${parameters.latitude}&lon=${parameters.longitude}`)
    .then(r => r.data);
};

export const getOffer = (id: number) =>
  axiosClient.get(`/offers/details/${id}`).then(r => r.data);

export const searchOffers = searchQuery =>
  axiosClient.get(`/offers?query=${searchQuery}`).then(r => r.data);

export const sendOfferAction = (
  id: number,
  actionType: 'reserve' | 'complete',
) =>
  axiosClient.post(`/offers/details/${id}/actions`, {
    actionType,
  });
