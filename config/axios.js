import axios from 'axios';

//export const apiUrl = 'http://localhost:5000';
export const apiUrl = 'https://hunt.alvlinarez.dev/hunt-server';

export const axiosClient = () => {
  return axios.create({
    baseURL: `${apiUrl}/api/`,
    withCredentials: true
  });
};
