import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from 'App';
import { store } from 'store';
import 'assets/scss/style.scss';
import { UserContextProvider } from './contexts/UserContext';

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <BrowserRouter >
    <UserContextProvider>
      <App />
      </UserContextProvider>
    </BrowserRouter>
  </Provider>
);

