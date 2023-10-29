import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51O42p1LtBZHl10nadD0az9nHXUqknNUgso0DR5mQ45NxR1lMxGy0zbcTzPWedSOXeTwG7xlAqm309wE1KV0kOvoJ00LrXdt0FT');
import {
	OK_STATUS_CODE,
	ERROR_STATUS_CODE
} from '../utils/Constants.js';


export const payment = (app) => {


    app.post('/pay', async (req, res) => {
        try{
            console.log(req.body);
            //const {total_amount} = req.body;
            
            const paymentIntent = await stripe.paymentIntents.create({
                amount: 50,
                currency: "usd",
                automatic_payment_methods: {
                  enabled: true,
                },
            });
            res.status(OK_STATUS_CODE).send({
                clientSecret: paymentIntent.client_secret,
            });
        }catch(err){
            res.status(ERROR_STATUS_CODE).send({err: err.message, status: ERROR_STATUS_CODE});
        }
    });
    
};
