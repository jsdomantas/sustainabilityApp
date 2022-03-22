import axios from 'axios';
import { supabase } from '../../utilities/supabase';

export const getScannedItemDetails = (barcode: string) =>
  axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);

export const getPantryItems = async () => {
  const userId = supabase.auth.user()?.id;

  const data = await supabase
    .from('pantry_items')
    .select('*')
    .eq('user_id', userId);

  return data;
};

export const addPantryItem = async (data: any) => {
  const userId = supabase.auth.user()?.id;

  await supabase.from('pantry_items').insert({ ...data, user_id: userId });
};
