import { clinicAxios } from './AxiosConfig';
import Swal from 'sweetalert2';
import { PAYMENT_ITEM_TYPES } from './Constants';
import { useUserContext } from 'hooks/useUserContext';

const { user } = useUserContext();
export const successfulPayment = (items, type) => {
  if (type === PAYMENT_ITEM_TYPES[0]) {
    clinicAxios.post(`/patient/${user.id}/health-packages`, { items })
      .catch((error) => {
        console.log('Error in placing the order', error);
      });
    return '/patient/pages/packages';
  } else if (type === PAYMENT_ITEM_TYPES[1]) {
    clinicAxios.post('/appointment', { items })
      .catch((error) => {
        console.log('Error in placing the order', error);
      });
    return '/patient/pages/appointments';
  }
};

export const paymentStatus = (status, navigate, item, type) => {

  switch (status) {
    case 'succeeded': {

      Swal.fire('success', 'Payment Succeeded', 'success').then(() => {
        const callBackUrl = successfulPayment(item, type);
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