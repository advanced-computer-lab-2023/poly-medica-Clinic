import Stripe from 'stripe';
import axios from 'axios';
const stripe = new Stripe('sk_test_51O42p1LtBZHl10nadD0az9nHXUqknNUgso0DR5mQ45NxR1lMxGy0zbcTzPWedSOXeTwG7xlAqm309wE1KV0kOvoJ00LrXdt0FT');
import {
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
    PATIENTS_BASE_URL,
    CLIENT_BASE_URL
} from '../utils/Constants.js';


export const payment = (app) => {
    let items = [];
    let total_amount = 0;
    let byWallet = false;

    app.post('/pay', async (req, res) => {
        items = req.body.items;
        total_amount = req.body.total_amount;
        type = req.body.type;
    })

    app.post('/pay-with-card', async (req, res) => {
        try{
            total_amount = 50;
            if(byWallet){
                total_amount = amountToPayByCard;
            }
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
    
    app.post('wallet-pay', async (req, res) => {
        try{
            byWallet = true;
            const amountInWallet = await axios.get(`${PATIENTS_BASE_URL}/wallet`);
            if(total_amount <= amountInWallet){
                amountInWallet = amountInWallet - total_amount;
                await axios.post(`${PATIENTS_BASE_URL}/wallet`, {amount : amountInWallet} );
                res.status(OK_STATUS_CODE);
            }else{
                amountToPayByCard = amountInWallet - total_amount;
                res.json({ redirectUrl: `${CLIENT_BASE_URL}/pages/payment` });
            }
        }catch(err){
            res.status(ERROR_STATUS_CODE).send({err: err.message, status: ERROR_STATUS_CODE});
        }
    });
};
