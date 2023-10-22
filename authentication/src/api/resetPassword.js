import ResetPasswordService from '../service/reset-password-service.js';
import UserService from '../service/user-service.js';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { BAD_REQUEST_CODE_400 } from '../utils/Constants.js';
export const resetPassword = (app) => {

	const resetPassword = new ResetPasswordService();
	const user = new UserService();

	const generateUniqueToken = () => {
		return uuidv4();
	  };

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
			console.log(userRecord);
			if(!userRecord ){
				throw new Error('invalid user');
			} else if(!userRecord.email){
				throw new Error('invalid Email');
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
		  text: `Click this link to reset your password: http://localhost:3000/reset-password/${OTP}`,
			};
	  
			transporter.sendMail(mailOptions, (error, info) => {
		  if (error) {
					console.log(error);
					res.status(500).json({ message: 'Failed to send email' });
		  } else {
					console.log(`Email sent: ${info.response}`);
					res.json({ message: 'Email sent' });
		  }
			});
		} catch(err){
			console.log(err);
			res.status(BAD_REQUEST_CODE_400).send({ errMessage: err.message });
		}
	  });
};