import { axiosClient } from './axiosConfig';

export const fetchIngredients = (): Promise<{ title: string; id: number }[]> =>
  axiosClient.get('/ingredients').then(response => response.data);

export const leaveReview = (receiverId, offerId, review) =>
  axiosClient.post('/offers/review', {
    receiverId,
    offerId,
    review,
  });
