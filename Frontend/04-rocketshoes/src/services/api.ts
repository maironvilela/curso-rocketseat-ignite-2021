import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  //baseURL: 'http://172.28.30.87/3333'
});
