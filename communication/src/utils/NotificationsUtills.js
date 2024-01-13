import { AUTH_BASE_URL } from './Constants.js';
import { socket } from './serverUtils.js';
import axios from 'axios';
import nodemailer from 'nodemailer';

const addNotificationForUser = async (userId, type, notification) => {
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
			name: 'acl notification',
			address: `${process.env.RESETEMAIL}`,
		},
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
};

export { addNotificationForUser };
