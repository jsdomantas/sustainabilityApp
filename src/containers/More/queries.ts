import { useMutation, useQuery } from 'react-query';
import { getReservationHistory, logout } from './api';

export const useLogoutMutation = () => useMutation(logout);

export const useReservationHistoryQuery = () =>
  useQuery(['offers', 'history'], getReservationHistory);
