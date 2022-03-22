import { useMutation } from 'react-query';
import { loginWithEmail, signUpWithEmail } from './api';

type Credentials = {
  email: string;
  password: string;
};

export const useLoginMutation = () =>
  useMutation((data: Credentials) => {
    return loginWithEmail(data.email, data.password);
  });

export const useSignUpMutation = () =>
  useMutation((data: Credentials) => {
    return signUpWithEmail(data.email, data.password);
  });
