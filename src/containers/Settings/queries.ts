import { useMutation } from 'react-query';
import { logout } from './api';

export const useLogoutMutation = () => useMutation(logout);
