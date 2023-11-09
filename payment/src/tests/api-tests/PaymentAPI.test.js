import request from 'supertest';
import app from '../../../app.js';

// Mocking the 'stripe' module
jest.mock('stripe');
import  paymentIntents from 'stripe';


describe('POST /payment/card', () => {
    it('should create a payment intent and return clientSecret', async () => {
        const mockPaymentIntent = {
            client_secret: 'mockClientSecret',
        };

        // Mock the Stripe API call
        paymentIntents.create.mockResolvedValue(mockPaymentIntent);

        const response = await request(app)
            .post('/payment/card')
            .send({ paymentAmount: 50 });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('clientSecret', 'mockClientSecret');
    });

    it('should handle errors and return the appropriate response', async () => {
        const mockError = new Error('Mocked error');

        // Mock the Stripe API call to throw an error
        paymentIntents.create.mockRejectedValue(mockError);

        const response = await request(app)
            .post('/payment/card')
            .send({ paymentAmount: 50 });

        expect(response.status).toBe(500); // Adjust the status code based on your error handling
        expect(response.body).toEqual({
            err: 'Mocked error',
            status: 500,
        });
    });
});
