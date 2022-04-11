import auth from '@react-native-firebase/auth';
import { axiosClient } from '../../axiosConfig';

export const loginWithEmail = async (email: string, password: string) => {
  return await auth().signInWithEmailAndPassword(email, password);
};

export const signUpWithEmail = async (
  email: string,
  password: string,
  profileData: any,
) => {
  return await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async value => {
      await axiosClient.post('/auth/signup', {
        email: value.user.email,
        uid: value.user.uid,
        ...profileData,
      });
    });
};
