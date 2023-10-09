import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';


const instance = axios.create({
  baseURL: 'http://localhost:8004',
  withCredentials: true 
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('jwt');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
        Swal.fire({
            icon: 'error',
            title: 'Unauthorized',
            text: 'You are unauthorized to access this resource.',
          }).then(() => {
            window.location.href = '/pages/login/login3';
          });
    }
    return error;
    // return Promise.reject(error);
  }
);

export default instance;
