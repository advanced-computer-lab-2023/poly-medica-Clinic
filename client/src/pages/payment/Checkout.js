import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  useNavigate
} from '@stripe/react-stripe-js';

import { Button } from '@mui/material';
import Swal from 'sweetalert2';


export default function CheckoutForm() {

  const stripe = useStripe();
  const [status, setStatus] = useState(null);
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
      
      switch (paymentIntent.status) {
        case 'succeeded':{
          setMessage('Payment succeeded!');
          Swal.fire('success', 'Payment Succeeded', 'success');
           // TODO: to redirect the user after payment is successful
        }
          break;
        case 'processing':{
          setMessage('Your payment is processing.');
        }
          break;
        case 'requires_payment_method':{
          setMessage('Your payment was not successful, please try again.');
          Swal.fire('error', 'failed payment', 'error');
        }
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
      setStatus(paymentIntent.status);
    });

  }, [stripe]);

  if(status === 'succeeded'){
    // TODO: to redirect the user after payment is successful
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/pages/payment',
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
      Swal.fire('error', error.message, 'error');
    } else {
      setMessage('An unexpected error occurred.');
      Swal.fire('error', error.message, 'error');
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: {
      type: 'accordion',
      defaultCollapsed: false,
      radios: true,
      spacedAccordionItems: true
    }
  };
  
  
  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      
      <PaymentElement id='payment-element' options={paymentElementOptions} />
      <Button disabled={isLoading || !stripe || !elements} fullWidth variant="contained" onClick={handleSubmit}>
          { 'Pay now'}
      </Button>
      {/* Show any error or success messages */}
      {message && <div id='payment-message' style={
        {
          color: 'rgb(105, 115, 134)',
          fontSize: '16px',
          lineHeight: '20px',
          paddingTop: '12px',
          textAlign: 'center',
        }
      }>{message}</div>}
    </form>
  );
}