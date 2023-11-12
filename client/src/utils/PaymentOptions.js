import { patientAxios, paymentAxios } from './AxiosConfig';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { successfulPayment } from './PaymentUtils';
import { useState } from 'react';
import { useUserContext } from 'hooks/useUserContext';

export const choosePayment = (items, amountToPay, type) => {

  const [amountInWallet, setAmountInWallet] = useState(0);
  const navigate = useNavigate();
  const { user } = useUserContext();
  const userId = user.id;

  patientAxios.get(`/patients/${userId}/wallet` + userId).then((response) => {
    setAmountInWallet(response.data.amountInWallet);
  });

  var paymentOptions = new Promise(function (resolve) {
    setTimeout(function () {
      resolve({
        'credit-card': '<i class="fas fa-credit-card"></i> Using Credit Card',
        'wallet': `<i class="fas fa-wallet"></i> Using Poly-wallet $ ${amountInWallet}`
      });
    }, 2000);
  });
  Swal.fire({
    title: 'Select Payment Option',
    input: 'radio',
    inputOptions: paymentOptions,
    inputValidator: function (result) {
      return new Promise(function (resolve, reject) {
        if (result) {
          resolve();
        } else {
          reject('You need to select payment method!');
        }
      });
    }
  }).then(function (result) {
    console.log('result = ', result.value);
    if (result.value === 'credit-card') {
      navigate('/patient/pages/payment', { state: { items, amountToPay, type }, replace: true });
    } else {
      if (amountInWallet >= amountToPay) {
        paymentAxios.post('/payment/wallet', { amountToPayByWallet: amountToPay, userId: userId })
          .then(
            Swal.fire('success', 'Payment Succeeded', 'success').then(
              () => {
                const callBackUrl = successfulPayment(items, type);
                navigate(callBackUrl, { replace: true });
              }
            )
          )
          .catch((error) => {
            console.log('Error in payment with the wallet', error);
          });
      } else {
        Swal.fire({
          title: 'Pay with the credit card',
          text: 'Do you want to pay the rest of the amount using the card',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.isConfirmed) {
            const amountToPayByWallet = amountToPay - amountInWallet;
            paymentAxios.post('/payment/wallet', { amountToPayByWallet, userId: userId })
              .catch((error) => {
                console.log('Error in payment with the wallet', error);
              });
            const amountToPayByCard = amountToPay - amountToPayByWallet;
            navigate('/patient/pages/payment', { state: { amountToPayByCard, items, type }, replace: true });
          }
        });
      }
    }
  });
};

