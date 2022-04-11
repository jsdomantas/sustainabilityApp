import { axiosClient } from './axiosConfig';

export const fetchIngredients = (): Promise<{ title: string; id: number }[]> =>
  axiosClient.get('/ingredients').then(response => response.data);
