import { clinicAxios } from './AxiosConfig';


export const successfulPayment = (items, type) => {
    if(type === 'Health-Package') {
      clinicAxios.post('/packages/place-order', { items })
      .catch((error) => {
        console.log('Error in placing the order', error);
      });
      return '/patient/pages/packages';
    } else if(type === 'appointment'){
      clinicAxios.post('/appointment', { items })
      .catch((error) => {
        console.log('Error in placing the order', error);
      });
      return '/patient/pages/appointments';
    }
};