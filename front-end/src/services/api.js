import axios from 'axios';

const instance = axios.create({
  //baseURL: 'https://ads-management-backend.onrender.com',
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: 'Bearer ' + 'admin'
  }
});

export default instance;
