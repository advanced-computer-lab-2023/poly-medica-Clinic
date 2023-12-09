import mongoose from "mongoose";
import NotificationService from "../service/notification-service.js";
import { AUTH_BASE_URL, BAD_REQUEST_CODE, DUPLICATE_KEY_ERROR_CODE, ERROR_STATUS_CODE, OK_STATUS_CODE, SERVER_ERROR_MESSAGE, ZERO_INDEX } from "../utils/Constants.js";


export const notification = (app) => {
    const service = new NotificationService();

    const detectCustumizedErrorMessage = (messages) =>{
        let errorMessages = new String();
        Object.keys(messages).forEach((field) => {
            if (messages[field].kind === 'required') {
            //   console.log(`Custom error for ${field}:`, err.errors);
              errorMessages += messages[field].message + "\n";
            }
          });
          return errorMessages
    }

    app.get('/notifications/:userId', async (req, res) =>{
        try{
            const userId = req.params.userId;
            const notifications = await service.getAllNotification(userId);
            res.send(notifications);
        } catch (error){
            res.status(ERROR_STATUS_CODE).send({ errMessage: SERVER_ERROR_MESSAGE});
        }
    });

    /**
     * there is three types 
     * 1- normal => a notification with just body and head
     * 2- appointment => a notification with body and head and doctor/patient name and image src (optional)
     * 3- medicine => for pahrmacy a notification with body and head and medicine name and medicine image src
     */

    app.post('/notification/:userId/type/:type', async (req, res) =>{
        try{
            const userId = req.params.userId;
            const type = req.params.type;
            const notification = req.body;
            await service.postNotification(userId, notification, type);
            const email = await axios.get(`${AUTH_BASE_URL}/user/${userId}/email`);
            const transporter = nodemailer.createTransport({
				service: 'Gmail', 
				host: 'setup.gmail.com',
				port: 587,
				secure: false,
				auth: {
					user: process.env.RESETEMAIL,
					pass: process.env.RESETPASSWORD,
				},
			});

			const mailOptions = {
				from: {
					name:'acl lab',
					address:`${process.env.RESETEMAIL}` },
				to: [email],
				subject: 'Password Reset',
				text: `you can login using the following OTP ${OTP}, \n it is valid for one time for 24 hr`,
			};
		
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					res.status(500).json({ message: 'Failed to send email' });
				} else {
					res.json({ message: 'Email sent' });
				}
			});
            res.status(OK_STATUS_CODE).end();
        } catch(error){
            if(error.errors){
                const errorMessages = detectCustumizedErrorMessage(error.errors)
                res.status(BAD_REQUEST_CODE).send({ errMessage: errorMessages});
            }
            else
                res.status(ERROR_STATUS_CODE).send({ errMessage: error.message })
        }
    });

    app.post('/user/:id', async (req, res) =>{
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
                const errorMessages = detectCustumizedErrorMessage(error.errors)
                res.status(BAD_REQUEST_CODE).send({ errMessage: errorMessages});
            } else{
                res.status(ERROR_STATUS_CODE).send({ errMessage: SERVER_ERROR_MESSAGE});
            }
        }
    })

    app.delete('/user/:id', async (req, res) => {
        try{
            const userId = req.params.id;
            await service.deleteNotificationUser(userId);
            res.status(OK_STATUS_CODE).end();
        } catch(error){
                res.status(ERROR_STATUS_CODE).send({ errMessage: SERVER_ERROR_MESSAGE});
        }
    });

    app.patch('/notification/:userId/:notificationId', async (req, res) =>{
        try{
            const userId = req.params.userId;
            const notificationId = req.params.notificationId;
            await service.patchNotificationState(userId, notificationId);
            res.status(OK_STATUS_CODE).end();
        } catch(error){
            res.status(ERROR_STATUS_CODE).send({ errMessage: error.message })
        }
    });

    app.patch('/notifications/:userId', async (req, res) =>{
        try{
            const userId = req.params.userId;
            await service.patchNotificationsState(userId);
            res.status(OK_STATUS_CODE).end();
        } catch(error){
            console.log(error);
            res.status(ERROR_STATUS_CODE).send({ errMessage: error.message })
        }
    });

}