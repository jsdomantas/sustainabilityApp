import { useMutation, useQuery } from 'react-query';
import { addPantryItem, getPantryItems, getScannedItemDetails } from '../api';
import { pantryKeys } from './queryKeys';
import { queryClient } from '../../../utilities/reactQuery';

export const useGetScannedItemMutation = () =>
  useMutation((barcode: string) => getScannedItemDetails(barcode));

export const useGetPantryItemsQuery = () =>
  useQuery(pantryKeys.pantry(), getPantryItems);

export const useAddPantryItemMutation = () =>
  useMutation((data: any) => addPantryItem(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(pantryKeys.pantry());
    },
  });
