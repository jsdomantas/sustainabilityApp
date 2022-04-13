import axios from 'axios';

export const getScannedItemDetails = (barcode: string) =>
  axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);

export const getPantryItems = async () => {
  return [];
};

export const addPantryItem = async (data: any) => {
  console.log('here');
};
