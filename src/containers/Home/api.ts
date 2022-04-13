import { axiosClient } from '../../axiosConfig';

export const getAllOffers = () => axiosClient.get('/offers').then(r => r.data);

export const getOffer = (id: number) =>
  axiosClient.get(`/offers/${id}`).then(r => r.data);
