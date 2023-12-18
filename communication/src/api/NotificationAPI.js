import NotificationService from '../service/notification-service.js';
import { AUTH_BASE_URL, BAD_REQUEST_CODE, DUPLICATE_KEY_ERROR_CODE, ERROR_STATUS_CODE, MEDICINE_NOTIFICATION_TYPE_ENUM, OK_STATUS_CODE, SERVER_ERROR_MESSAGE, ZERO_INDEX } from '../utils/Constants.js';
import { socket } from '../utils/serverUtils.js';
import axios from 'axios';
import nodemailer from 'nodemailer';
export const notification = (app) => {
	const service = new NotificationService();

	const addNotificationForUser = async(userId, type, notification) =>{
		// const userId = req.params.userId;
			// const type = req.params.type;
			// const notification = req.body;
			await service.postNotification(userId, notification, type);
			let email = await axios.get(`${AUTH_BASE_URL}/user/${userId}/email`);
			email = email.data;
			const transporter = nodemailer.createTransport({
				service: 'Gmail', 
				host: 'setup.gmail.com',
				port: 587,
				secure: true,
				auth: {
					user: process.env.RESETEMAIL,
					pass: process.env.RESETPASSWORD,
				},
			});

			const mailOptions = {
				from: {
					name:'acl notification',
					address:`${process.env.RESETEMAIL}` },
				to: [email],
				subject: `${notification.notificationHead}`,
				text: `${notification.notificationBody}`,
			};
		
			transporter.sendMail(mailOptions, (error, info) => {
				console.log('info = ', info);
				if (error) {
					console.log(error);
					// res.status(500).json({ message: 'Failed to send email' });
				} else {
					// res.json({ message: 'Email sent' });
				}
			});

			socket.emit('update notifications', userId);
	}

	const detectCustumizedErrorMessage = (messages) => {
		let errorMessages = new String();
		Object.keys(messages).forEach((field) => {
			if (messages[field].kind === 'required') {
				//   console.log(`Custom error for ${field}:`, err.errors);
				errorMessages += messages[field].message + '\n';
			}
		});
		return errorMessages;
	};

	app.get('/notifications/:userId', async (req, res) => {
		try{
			const userId = req.params.userId;
			const notifications = await service.getAllNotification(userId);
			res.send(notifications);
		} catch (error){
			res.status(ERROR_STATUS_CODE).send({ errMessage: SERVER_ERROR_MESSAGE });
		}
	});

	/**
     * there is three types 
     * 1- normal => a notification with just body and head
     * 2- appointment => a notification with body and head and doctor/patient name and image src (optional)
     * 3- medicine => for pahrmacy a notification with body and head and medicine name and medicine image src
     */

	app.post('/notification/:userId/type/:type', async (req, res) => {
		try{
			const userId = req.params.userId;
			const type = req.params.type;
			const notification = req.body;
			await addNotificationForUser(userId, type, notification);
			res.status(OK_STATUS_CODE).end();
		} catch(error){
			if(error.errors){
				const errorMessages = detectCustumizedErrorMessage(error.errors);
				res.status(BAD_REQUEST_CODE).send({ errMessage: errorMessages });
			}
			else
				res.status(ERROR_STATUS_CODE).send({ errMessage: error.message });
		}
	});

	app.post('/user/:id', async (req, res) => {
		try{
			const userId = req.params.id;
			await service.postNotificationUser(userId);
			res.status(OK_STATUS_CODE).end();
		}catch(error){
			console.log(error);
			if(error.code == DUPLICATE_KEY_ERROR_CODE){
				const duplicateKeyAttrb = Object.keys(error.keyPattern)[
					ZERO_INDEX
				];
				res.status(BAD_REQUEST_CODE).send({
					errCode: DUPLICATE_KEY_ERROR_CODE,
					errMessage: `that ${duplicateKeyAttrb} is already exist`,
				});
			} else if(error.errors){
				const errorMessages = detectCustumizedErrorMessage(error.errors);
				res.status(BAD_REQUEST_CODE).send({ errMessage: errorMessages });
			} else{
				res.status(ERROR_STATUS_CODE).send({ errMessage: SERVER_ERROR_MESSAGE });
			}
		}
	});

	app.delete('/user/:id', async (req, res) => {
		try{
			const userId = req.params.id;
			await service.deleteNotificationUser(userId);
			res.status(OK_STATUS_CODE).end();
		} catch(error){
			res.status(ERROR_STATUS_CODE).send({ errMessage: SERVER_ERROR_MESSAGE });
		}
	});

	app.patch('/notification/:userId/:notificationId', async (req, res) => {
		try{
			const userId = req.params.userId;
			const notificationId = req.params.notificationId;
			await service.patchNotificationState(userId, notificationId);
			res.status(OK_STATUS_CODE).end();
		} catch(error){
			res.status(ERROR_STATUS_CODE).send({ errMessage: error.message });
		}
	});

	app.patch('/notifications/:userId', async (req, res) => {
		try{
			const userId = req.params.userId;
			await service.patchNotificationsState(userId);
			res.status(OK_STATUS_CODE).end();
		} catch(error){
			console.log(error);
			res.status(ERROR_STATUS_CODE).send({ errMessage: error.message });
		}
	});


	app.post('/notifications/medicines/:medicineName', async (req, res) => {
		try{
			const sendedData = await axios.get(`${AUTH_BASE_URL}/pharmacists/id`);
			const pharmacist = sendedData.data;
			const medicineName = req.params.medicineName;
			const type = MEDICINE_NOTIFICATION_TYPE_ENUM;
			const notification = {
				notificationHead:`medicine out of stock`, 
    			notificationBody: `the medicine ${medicineName} is out of stock`,
				senderName : "system"
			};
			for(let i = 0; i !=pharmacist.length; i++){
				const userId = pharmacist[i];
				await addNotificationForUser(userId, type, notification);
			}
			res.status(OK_STATUS_CODE).end();
		} catch(error){
			res.status(ERROR_STATUS_CODE).send({ errMessage: error.message });
			console.log(error);
		}
	})
};