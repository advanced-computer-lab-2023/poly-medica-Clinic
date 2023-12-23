import { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { paymentElementOptions, paymentStatus } from '../../utils/PaymentUtils';
import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserContext } from 'hooks/useUserContext';
import { PAYMENT_ITEM_TYPES } from '../../utils/Constants';
import { showFailureAlert } from 'utils/swal';

export default function CheckoutForm({ item, type, selectedDoctor }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { user } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      const deserializedItem = queryParams.get('item');
      item = JSON.parse(decodeURIComponent(deserializedItem));
      type = queryParams.get('type');
      setMessage(paymentStatus(user.id, paymentIntent.status, navigate, item, type));
    });

  }, [stripe]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    const serializedItem = JSON.stringify(item);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/patient/pages/payment?item=${encodeURIComponent(serializedItem)}&type=${encodeURIComponent(type)}`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }
    showFailureAlert('error', error.message);
    setIsLoading(false);
  };

  const handleCancel = async () => {
    if (type === PAYMENT_ITEM_TYPES[0]) {
      navigate('/patient/pages/packages');
    } else if (type === PAYMENT_ITEM_TYPES[1]) {
      console.log('was here');
      if (selectedDoctor != '') {
        navigate('/patient/pages/doctors', { state: { selectedDoctor } });
      }
    }
  };

  return (
    <form id='payment-form' onSubmit={handleSubmit}>

      <PaymentElement id='payment-element' options={paymentElementOptions}
      />
      <Button disabled={isLoading || !stripe || !elements} fullWidth variant="contained" onClick={handleSubmit}
        sx={{ mt: 0.5 }}
      >
        {'Pay now'}
      </Button>
      {message && <div id='payment-message' style={
        {
          color: 'rgb(105, 115, 134)',
          fontSize: '16px',
          lineHeight: '20px',
          paddingTop: '12px',
          textAlign: 'center',
        }
      }>{message}</div>}

      <Button disabled={isLoading || !stripe || !elements} fullWidth variant="outlined" onClick={handleCancel}
        color='secondary'
        sx={{ mt: 1 }}
      >
        {'Cancel'}
      </Button>

    </form>
  );
}