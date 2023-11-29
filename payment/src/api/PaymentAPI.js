import Stripe from 'stripe';
import axios from 'axios';

import {
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
    CLINIC_BASE_URL,
    PATIENTS_BASE_URL,
    BAD_REQUEST_CODE_400,
    SECRET_KEY
} from '../utils/Constants.js';
import { isValidMongoId } from '../utils/Validation.js';

const stripe = new Stripe(SECRET_KEY);

export const payment = (app) => {

    app.post('/payment/card', async (req, res) => {
        try{
            const total_amount = Number(req.body.paymentAmount);
            const paymentIntent = await stripe.paymentIntents.create({
                amount: parseInt(total_amount * 100),
                currency: "usd",
                automatic_payment_methods: {
                  enabled: true,
                },
            });
            res.status(OK_STATUS_CODE).send({
                clientSecret: paymentIntent.client_secret,
            });
        }catch(err){
            console.log(err.message);
            res.status(ERROR_STATUS_CODE).send({err: err.message, status: ERROR_STATUS_CODE});
        }
    });
    
    app.post('/payment/wallet', async (req, res) => {
        try{
            const amountToPay = req.body.amountToPayByWallet;
            const userId = req.body.userId;
            const result = await axios.get(`${PATIENTS_BASE_URL}/patients/${userId}/wallet`);
            let amountInWallet = result.data.walletAmount;
            if(amountToPay <= amountInWallet){
                amountInWallet = amountInWallet - amountToPay;
                
                await axios.patch(`${PATIENTS_BASE_URL}/patients/${userId}/wallet`, {amount : amountInWallet} );
                res.status(OK_STATUS_CODE).send("Payment successful");
            }else{
                res.status(BAD_REQUEST_CODE_400).json("insufficient amount in the wallet");
            }
        }catch(err){
            console.log(err.message);
            res.status(ERROR_STATUS_CODE).send({err: err.message, status: ERROR_STATUS_CODE});
        }
    });

    app.post('/payment-salary/doctor/:doctorId/wallet', async(req, res) => {
        try{
            const { doctorId } = req.params;
            if (!isValidMongoId(doctorId)) {
                return res.status(ERROR_STATUS_CODE).json({
                    message: 'invalid id',
                });
            }
            const pricePaidToDoctor = parseFloat(req.body.pricePaidToDoctor);
            const axiosRes = await axios.patch(`${CLINIC_BASE_URL}/doctors/${doctorId}/wallet`, {
                pricePaidToDoctor
            });
            console.log('axiosRes = ', axiosRes);
            res.status(OK_STATUS_CODE).json({ updatedDoctor: axiosRes.data.updatedDoctor });
        }
        catch(err){
            console.log(err.message);
            res.status(ERROR_STATUS_CODE).send({err: err.message, status: ERROR_STATUS_CODE});
        }
    });
};
