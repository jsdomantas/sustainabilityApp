import { axiosClient } from '../../axiosConfig';

export const fetchFoodCollections = () => axiosClient.get('/foodCollection');

export const saveFoodCollection = data =>
  axiosClient.post('/foodCollection', data);
