import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://google.com',
});

export default instance;
