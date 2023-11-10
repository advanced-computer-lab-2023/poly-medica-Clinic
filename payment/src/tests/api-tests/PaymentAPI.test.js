import request from 'supertest';
import app from '../../../app.js';
import {
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
    BAD_REQUEST_CODE_400
} from '../../utils/Constants.js';
import axios from 'axios';

const mockPaymentsIntentsCreate = jest.fn();
const paymentAmount = 50;
jest.mock('stripe', () => jest.fn(() => ({
    paymentIntents: {
        create: (...args) => mockPaymentsIntentsCreate(...args)
    },
})));


describe('POST /payment/card', () => {
    it('should create a payment intent and return clientSecret', async () => {
        const mockPaymentIntent = {
            client_secret: 'mockClientSecret',
        };

        mockPaymentsIntentsCreate.mockResolvedValue(mockPaymentIntent);

        const response = await request(app)
            .post('/payment/card')
            .send({ paymentAmount: paymentAmount });

        expect(response.status).toBe(OK_STATUS_CODE);
        expect(response.body).toHaveProperty('clientSecret', 'mockClientSecret');
    });

    it('should handle errors and return the appropriate response', async () => {
        const mockError = new Error('Mocked error');

        mockPaymentsIntentsCreate.mockRejectedValueOnce(mockError);
        
        const response = await request(app)
            .post('/payment/card')
            .send({ paymentAmount: paymentAmount });
        expect(response.status).toBe(ERROR_STATUS_CODE); 
        expect(response.body).toEqual({
            err: 'Mocked error',
            status: ERROR_STATUS_CODE,
        });
    });
});
jest.mock('axios');
describe('POST /payment/wallet', () => {
    const mockWalletAmount = 100;
    const mockUserId = 123;

    it('should process payment in the wallet successfully', async () => {
        axios.get.mockResolvedValue(mockWalletAmount);
        axios.patch.mockResolvedValue({});
        const response = await request(app)
        .post('/payment/wallet')
        .send({ userId: mockUserId, amountToPayByWallet: 50 });
        console.log(response.text);
        expect(response.status).toBe(OK_STATUS_CODE);
        expect(response.text).toBe('Payment successful');
    });
  
    it('should handle insufficient funds', async () => {
        axios.get.mockReturnValue(mockWalletAmount);   
        axios.patch.mockResolvedValue({});
        const response = await request(app)
        .post('/payment/wallet')
        .send({  userId: mockUserId, amountToPayByWallet: 150 });
        expect(response.status).toBe(BAD_REQUEST_CODE_400);
        expect(response.body).toBe('insufficient amount in the wallet');
    });
  
    it('should handle errors during payment processing', async () => {
      
        axios.get.mockRejectedValue(new Error('Mocked error'));
        axios.patch.mockResolvedValue({});
        const response = await request(app)
        .post('/payment/wallet')
        .send({ amountToPayByWallet: 50 });
        expect(response.status).toBe(ERROR_STATUS_CODE);
        expect(response.body).toEqual({
        err: 'Mocked error',
        status: ERROR_STATUS_CODE,
      });
    });
  });





