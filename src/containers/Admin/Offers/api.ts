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
