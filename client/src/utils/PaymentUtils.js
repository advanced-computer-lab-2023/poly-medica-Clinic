import { clinicAxios, patientAxios } from './AxiosConfig';
import Swal from 'sweetalert2';
import { PAYMENT_ITEM_TYPES } from './Constants';

export const successfulPayment = (userId, items, type) => {
  console.log('items = ', items);
  console.log('type = ', type);
  if (type === PAYMENT_ITEM_TYPES[0]) {
    console.log('condition true');
    patientAxios.patch(`/patient/${userId}/health-packages`, { items })
      .catch((error) => {
        console.log('Error in placing the order', error);
      });
    return '/patient/pages/packages';
  } else if (type === PAYMENT_ITEM_TYPES[1]) {
    clinicAxios.post('/appointments', { items })
      .catch((error) => {
        console.log('Error in placing the order', error);
      });
      // paymentAxios
    return '/patient/pages/appointments';
  }
};

export const paymentStatus = (userId, status, navigate, item, type) => {

  switch (status) {
    case 'succeeded': {

      Swal.fire('success', 'Payment Succeeded', 'success').then(() => {
        const callBackUrl = successfulPayment(userId ,item, type);
        navigate(callBackUrl, { replace: true });
      }
      ).catch((error) => {
        console.log('Error the purchase', error);
      });
      return ('Payment succeeded!');
    }

    case 'processing': {
      return ('Your payment is processing.');
    }

    case 'requires_payment_method': {

      Swal.fire('error', 'failed payment', 'error');
      return ('Your payment was not successful, please try again.');
    }

    default:
      return ('Something went wrong.');
  }
};

export const paymentElementOptions = {
  layout: {
    type: 'accordion',
    defaultCollapsed: false,
    radios: true,
    spacedAccordionItems: true
  }
};