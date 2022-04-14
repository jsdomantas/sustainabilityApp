import axios from 'axios';
import { axiosClient } from '../../axiosConfig';

export const getScannedItemDetails = (barcode: string) =>
  axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);

export const getPantryItems = async () =>
  await axiosClient.get('/pantry').then(data => data.data);

export const addPantryItem = async (data: any) =>
  await axiosClient.post('/pantry', data);
