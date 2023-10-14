import axios from 'axios';
import Swal from 'sweetalert2';


const instance = axios.create({
  baseURL: 'http://localhost:8004',
  withCredentials: true 
});

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
