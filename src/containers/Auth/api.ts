import auth from '@react-native-firebase/auth';
import { axiosClient, setJWT } from '../../axiosConfig';

export const loginWithEmail = async (
  email: string,
  password: string,
  callback: any,
) => {
  console.log(email);
  return await auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      auth()
        .currentUser?.getIdToken()
        .then(token => {
          console.log(token);
          setJWT(token);
          callback();
        });
    });
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

export const getProfile = async () =>
  await axiosClient.get('/auth/profile').then(res => res.data);
