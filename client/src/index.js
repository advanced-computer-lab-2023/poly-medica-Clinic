import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from 'App';
import { store } from 'store';
import 'assets/scss/style.scss';
import { PaymentProvider } from './contexts/PaymentContext';
import { BrowserRouter } from 'react-router-dom';

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <PaymentProvider>
        <App />
      </PaymentProvider>
    </BrowserRouter>
  </Provider>
);

