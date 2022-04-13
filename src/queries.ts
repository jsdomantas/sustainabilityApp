import { useMutation, useQuery } from 'react-query';
import { fetchIngredients, leaveReview } from './api';
import { saveFoodCollection } from './containers/Admin/api';
import { Region } from 'react-native-maps';

export const useIngredientsQuery = () =>
  useQuery('ingredients', fetchIngredients, {
    select: data =>
      data.map(ingredient => ({
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

export const useLeaveReviewMutation = () =>
  useMutation((data: any) =>
    leaveReview(data.receiverId, data.offerId, data.review),
  );
