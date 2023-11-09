import Stripe from 'stripe';
import axios from 'axios';
const stripe = new Stripe('sk_test_51O42p1LtBZHl10nadD0az9nHXUqknNUgso0DR5mQ45NxR1lMxGy0zbcTzPWedSOXeTwG7xlAqm309wE1KV0kOvoJ00LrXdt0FT');
import {
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
    PATIENTS_BASE_URL,
} from '../utils/Constants.js';


export const payment = (app) => {

    app.post('/payment/card', async (req, res) => {
        try{
            const total_amount = req.body.paymentAmount;
            const paymentIntent = await stripe.paymentIntents.create({
                amount: (total_amount * 100),
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
    
    app.post('payment/wallet', async (req, res) => {
        try{
            const amountToPay = req.body.amountToPayByWallet;
            const amountInWallet = await axios.get(`${PATIENTS_BASE_URL}/wallet`);
            if(amountToPay <= amountInWallet){
                amountInWallet = amountInWallet - amountToPay;
                await axios.patch(`${PATIENTS_BASE_URL}/wallet`, {amount : amountInWallet} );
                res.status(OK_STATUS_CODE);
            }else{
                res.status(ERROR_STATUS_CODE).json("insufficient amount in the wallet");
            }
        }catch(err){
            res.status(ERROR_STATUS_CODE).send({err: err.message, status: ERROR_STATUS_CODE});
        }
    });
};
