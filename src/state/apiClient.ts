import axios from 'axios';

export const BASE_URL = 'http://localhost:3001/api';

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2000,
});
