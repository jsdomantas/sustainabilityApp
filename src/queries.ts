import { useMutation, useQuery } from 'react-query';
import { fetchIngredients } from './api';
import { saveFoodCollection } from './containers/Admin/api';
import { Region } from 'react-native-maps';

export const useIngredientsQuery = () =>
  useQuery('ingredients', fetchIngredients, {
    select: data =>
      data.data.map(ingredient => ({
        label: ingredient.title,
        value: ingredient.id,
      })),
  });

type FoodCollection = {
  title: string;
  neededIngredients: Array<number>;
  description: string;
  coordinates: Region;
};

export const useFoodCollectionMutation = () =>
  useMutation((data: FoodCollection) => saveFoodCollection(data));
