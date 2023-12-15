import axios from 'axios';
// import Swal from 'sweetalert2';


// Define the base URLs for each microservice
const clinicBaseUrl = 'http://localhost:8001';
const patientBaseUrl = 'http://localhost:8002';
const pharmacyBaseUrl = 'http://localhost:8003';
const paymentBaseUrl = 'http://localhost:8005';
const authenticationBaseUrl = 'http://localhost:8004';
const communicationBaseUrl = 'http://localhost:8006';

export const clinicAxios = axios.create({
    baseURL: clinicBaseUrl,
    withCredentials: true,
});
// .interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       if (error.response && error.response.status === 401) {
//           Swal.fire({
//               icon: 'error',
//               title: 'Unauthorized',
//               text: 'You are unauthorized to access this resource.',
//             }).then(() => {
//               window.location.href = '/pages/login/login3';
//             });
//       } else return error
//     }
//   );

// checkUserAuth(clinicAxios);

export const patientAxios = axios.create({
    baseURL: patientBaseUrl,
    withCredentials: true,
});
// .interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       if (error.response && error.response.status === 401) {
//           Swal.fire({
//               icon: 'error',
//               title: 'Unauthorized',
//               text: 'You are unauthorized to access this resource.',
//             }).then(() => {
//               window.location.href = '/pages/login/login3';
//             });
//       }
//     }
  // );

export const pharmacyAxios = axios.create({
    baseURL: pharmacyBaseUrl,
    withCredentials: true,
});
// .interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       if (error.response && error.response.status === 401) {
//           Swal.fire({
//               icon: 'error',
//               title: 'Unauthorized',
//               text: 'You are unauthorized to access this resource.',
//             }).then(() => {
//               window.location.href = '/pages/login/login3';
//             });
//       }
//     }
  // );

export const paymentAxios = axios.create({
    baseURL: paymentBaseUrl,
    withCredentials: true,
});
export const authenticationAxios = axios.create({
    baseURL: authenticationBaseUrl,
    withCredentials: true,
});

export const communicationAxios = axios.create({
    baseURL: communicationBaseUrl,
    withCredentials: true,
});
