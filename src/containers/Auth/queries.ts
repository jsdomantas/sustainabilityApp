import { useMutation, useQuery } from 'react-query';
import { getProfile, loginWithEmail, signUpWithEmail } from './api';

type Login = {
  email: string;
  password: string;
  callback: any;
};

type Credentials = {
  email: string;
  password: string;
  profileData: any;
  callback: () => void;
};

export const useLoginMutation = () =>
  useMutation((data: Login) => {
    return loginWithEmail(data.email, data.password, data.callback);
  });

export const useSignUpMutation = () =>
  useMutation((data: Credentials) => {
    return signUpWithEmail(
      data.email,
      data.password,
      data.profileData,
      data.callback,
    );
  });

export const useProfileQuery = () =>
  useQuery(['user', 'profile'], getProfile, { enabled: false });
