import { clinicAxios, patientAxios, paymentAxios, communicationAxios } from './AxiosConfig';
import { PAYMENT_ITEM_TYPES } from './Constants';
import { showFailureAlert, showSuccessAlert } from './swal';

export const successfulPayment = (userId, items, type) => {
  if (type === PAYMENT_ITEM_TYPES[0]) {
    patientAxios.patch(`/patient/${userId}/health-packages`, { items })
      .catch((error) => {
        console.log('Error in placing the order', error);
      });
    return '/patient/pages/packages';
  } else if (type === PAYMENT_ITEM_TYPES[1]) {
    clinicAxios.post('/appointments', { items })
      .then(() => {
        // payment to doctor
        payDoctor(items)
          .then(async () => {
            await communicationAxios.post(`/notification/${items.doctorId}/type/appointment`, {
              senderName: items.doctorName,
              notificationHead: 'Appointment Booked',
              notificationBody: `Mr/Miss ${items.patientName} has booked an appointment with you`
          });
          })
          .catch((err) => {
            console.log('err = ', err);
          });
      })
      .catch((error) => {
        console.log('Error in placing the order', error);
      });
    return '/patient/pages/appointments';
  }
};

export const paymentStatus = (userId, status, navigate, item, type) => {

  switch (status) {
    case 'succeeded': {
      showSuccessAlert('success', 'Payment Succeeded', () => {
        const callBackUrl = successfulPayment(userId ,item, type);
        navigate(callBackUrl, { replace: true });
      })
      .catch((error) => {
        console.log('Error the purchase', error);
      });
      return ('Payment succeeded!');
    }

    case 'processing': {
      return ('Your payment is processing.');
    }

    case 'requires_payment_method': {
      showFailureAlert('error', 'failed payment');
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

export const payDoctor = async (items) => {
  const { doctorId, pricePaidToDoctor } = items;
  return await paymentAxios.post(`/payment-salary/doctor/${doctorId}/wallet`, { 
    pricePaidToDoctor
  });
};