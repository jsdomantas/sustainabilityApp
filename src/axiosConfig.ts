import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://10.0.2.2:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setJWT = (jwt: string) => {
  axiosClient.defaults.headers.common.Authorization = `Bearer ${jwt}`;
};
