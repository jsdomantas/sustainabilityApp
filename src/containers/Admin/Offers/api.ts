import { axiosClient } from '../../../axiosConfig';

export const getStockProducts = async (): Promise<
  { title: string; id: number }[]
> => axiosClient.get('/offers/stock').then(data => data.data);
