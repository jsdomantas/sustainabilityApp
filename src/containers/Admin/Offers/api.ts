import { axiosClient } from '../../../axiosConfig';

export const getStockProducts = async (): Promise<
  { title: string; id: number }[]
> => axiosClient.get('/offers/stock').then(data => data.data);

export const createOffer = async (data: {
  title: string;
  products: Array<{ value: number; label: string }>;
  description: string;
  photoUrl: string;
}) => axiosClient.post('/offers', data).then();

export const getCreatedOffers = async (): Promise<any> =>
  axiosClient.get('/offers/created').then(data => data.data);

export const getCreatedOffer = async (id: number): Promise<any> =>
  axiosClient.get(`/offers/created/${id}`).then(data => data.data);
