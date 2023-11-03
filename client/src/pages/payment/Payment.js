import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { paymentAxios } from '../../utils/AxiosConfig';
import CheckoutForm from './Checkout';
import MainCard from '../../ui-component/cards/MainCard';

const stripePromise = loadStripe('pk_test_51O42p1LtBZHl10napsQI3fM0sBwi0QLCZJc7k8wpLLfbGVnpf8QcQvBUkNiNVL6TGkqMzL5bADebhcTdZhKDNiqv00ESfjq69z');

export default function App() {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
        paymentAxios.post('/pay-with-card')
      .then((data) => setClientSecret(data.data.clientSecret));

  }, []);


  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <MainCard title='Pay'>
        <div className='App'>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    </MainCard>
    
  );
}