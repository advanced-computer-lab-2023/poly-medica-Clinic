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
import PaymentService from '../service/payment-service.js';


export const payment = (app) => {

    const service = new PaymentService();

    app.post('/payment/card', async (req, res) => {
        try{
            const total_amount = Number(req.body.paymentAmount);
            const paymentIntent = service.createPaymentIntent(total_amount);
            res.status(OK_STATUS_CODE).send({
                clientSecret: paymentIntent.client_secret,
            });
        }catch(err){
            console.log(err.message);
            res.status(ERROR_STATUS_CODE).send({err: err.message, status: ERROR_STATUS_CODE});
        }
    });
    
    app.post('/payment/wallet', async (req, res) => { // patient pays using wallet
        try{
            const amountToPay = req.body.amountToPayByWallet;
            const userId = req.body.userId;
            const result = await axios.get(`${PATIENTS_BASE_URL}/patients/${userId}/wallet`);
            const amountInWallet = result.data.walletAmount;
            if(amountToPay <= amountInWallet){
                await axios.patch(`${PATIENTS_BASE_URL}/patients/${userId}/wallet`, {walletChange : -amountToPay} );
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
            const walletChange = parseFloat(req.body.pricePaidToDoctor);
            const axiosRes = await axios.patch(`${CLINIC_BASE_URL}/doctors/${doctorId}/wallet`, {
                walletChange
            });
            res.status(OK_STATUS_CODE).json({ updatedDoctor: axiosRes.data.updatedDoctor });
        }
        catch(err){
            console.log(err.message);
            res.status(ERROR_STATUS_CODE).send({err: err.message, status: ERROR_STATUS_CODE});
        }
    });
};
