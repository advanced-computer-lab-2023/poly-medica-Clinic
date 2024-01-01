import reducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';

// // ==============================|| REDUX - MAIN STORE ||============================== //

export const store = configureStore({
    reducer
});
