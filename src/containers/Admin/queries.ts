import { useQuery } from 'react-query';
import { fetchFoodCollection, fetchFoodCollections } from './api';

export const useFoodCollectionsQuery = () =>
  useQuery('foodCollections', fetchFoodCollections);

export const useFoodCollectionQuery = (id: number) =>
  useQuery(['foodCollection', id], () => fetchFoodCollection(id));
