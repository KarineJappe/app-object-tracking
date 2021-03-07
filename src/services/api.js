import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-object-tracking.herokuapp.com'
});

export default api;