import { axiosClient } from '../../axiosConfig';

export const fetchFoodCollections = () => axiosClient.get('/foodCollection');

export const fetchFoodCollection = (id: number) =>
  axiosClient.get(`/foodCollection/${id}`);

export const saveFoodCollection = data =>
  axiosClient.post('/foodCollection', data);
