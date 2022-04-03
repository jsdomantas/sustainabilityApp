import { axiosClient } from './axiosConfig';

export const fetchIngredients = () => axiosClient.get('/ingredients');
