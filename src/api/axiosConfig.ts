import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
  // You can add additional Axios configurations here, such as headers, interceptors, etc.
});

export default api;
