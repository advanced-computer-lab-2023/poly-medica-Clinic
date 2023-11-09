import request from 'supertest';
import app from '../../../app.js';
import {
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
} from '../../utils/Constants.js';

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

        // Mock the Stripe API call
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
