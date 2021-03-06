import axios from 'axios';
import { Platform } from 'react-native';

export const axiosClient = axios.create({
  baseURL:
    Platform.OS === 'ios' ? 'http://localhost:8000/' : 'http://10.0.2.2:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setJWT = (jwt: string) => {
  axiosClient.defaults.headers.common.Authorization = `Bearer ${jwt}`;
};
