import ResetPasswordService from '../service/reset-password-service.js';
import UserService from '../service/user-service.js';
import nodemailer from 'nodemailer';
import { BAD_REQUEST_CODE_400 } from '../utils/Constants.js';
export const resetPassword = (app) => {

	const resetPassword = new ResetPasswordService();
	const user = new UserService();


	function generateRandom6DigitNumber() {
		const min = 100000; // Minimum 6-digit number
		const max = 999999; // Maximum 6-digit number

		// Generate a random number in the range [min, max]
		const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		return randomNumber;
	}

	app.post('/reset-password', async (req, res) => {
		const { email } = req.body;
		const OTP = generateRandom6DigitNumber();
		
		try {
			const userRecord = await user.findUserByEmail(email);
			if(!userRecord ){
				throw new Error('invalid user in the system');
			}

			// TODO: access the reset password database
			await resetPassword.removeRecordByEmail(email);
			await resetPassword.addRecord(email, OTP);
		
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
		} catch(err){
			res.status(BAD_REQUEST_CODE_400).send({ errMessage: err.message });
		}
	});
};