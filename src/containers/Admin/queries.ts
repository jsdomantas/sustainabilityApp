import { useQuery } from 'react-query';
import { fetchFoodCollections } from './api';

export const useFoodCollectionsQuery = () =>
  useQuery('foodCollections', fetchFoodCollections);
