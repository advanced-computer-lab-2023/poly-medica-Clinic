import React, { createContext, useContext, useState } from 'react';

const PaymentContext = createContext();

export const usePayment = () => {
  return useContext(PaymentContext);
};

export const PaymentProvider = ({ children }) => {
  const [paymentDone, setPaymentDone] = useState(0);


  return (
    <PaymentContext.Provider value={{ paymentDone, setPaymentDone }}>
      {children}
    </PaymentContext.Provider>
  );
};
