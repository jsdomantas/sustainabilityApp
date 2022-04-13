import auth from '@react-native-firebase/auth';
import { axiosClient } from '../../axiosConfig';

export const logout = async () => {
  await auth().signOut();
};

export const getReservationHistory = async () =>
  axiosClient.get('/offers/history').then(r => r.data);
