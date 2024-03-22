import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://dummyjson.com',
});

export default customAxios;
