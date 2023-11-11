import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { paymentAxios } from '../../utils/AxiosConfig';
import CheckoutForm from './Checkout';
import MainCard from '../../ui-component/cards/MainCard';
import { useLocation } from 'react-router-dom';
import { PUBLIC_KEY } from '../../utils/Constants';
const stripePromise = loadStripe(PUBLIC_KEY);

export default function App() {
  const [clientSecret, setClientSecret] = useState('');

  const location = useLocation();
  let paymentAmount = 0;
  let type = '';
  let item = [];

  if (location.state) {
    item = location.state.items;
    type = location.state.type;
    paymentAmount = location.state.amountToPay;
  } else {
    paymentAmount = 1;
  }
  console.log('the payment amount is : ', paymentAmount);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    paymentAxios.post('/payment/card', { paymentAmount })
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
            <CheckoutForm item={item} type={type} />
          </Elements>
        )}
      </div>
    </MainCard>

  );
}