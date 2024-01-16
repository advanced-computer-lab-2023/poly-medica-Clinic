import Stripe from 'stripe';
import {
    SECRET_KEY
} from '../utils/Constants.js';

const stripe = new Stripe(SECRET_KEY);

class PaymentService{

    async createPaymentIntent(total_amount){
        await stripe.paymentIntents.create({
            amount: parseInt(total_amount * 100),
            currency: "usd",
            automatic_payment_methods: {
              enabled: true,
            },
        });
    }
}

export default PaymentService;