import UserService from '../service/user-service.js';
import {
	ADMIN_Clinic_SIGNUP_URL,
	ADMIN_FRONT_ENUM,
	ADMIN_Pharmacy_SIGNUP_URL,
	BAD_REQUEST_CODE_400,
	CLINIC_ADMIN_ENUM,
	CLINIC_REQ,
	COMMUNICATION_USER_POST_URL,
	DOCOTOR_CHECK_DOC_USERS,
	DOCOTOR_SIGNUP_URL,
	DOCTOR_ENUM,
	DUB_EMAIL_ERROR_MESSAGE,
	DUB_USERNAME_ERROR_MESSAGE,
	DUPLICATE_KEY_ERROR_CODE,
	OK_REQUEST_CODE_200,
	ONE_DAY_MAX_AGE_IN_MIINUTS,
	ONE_DAY_MAX_AGE_IN_MILLEMIINUTS,
	PATIENT_ENUM,
	PATIENT_SIGNUP_URL,
	PHARMACIST_BASE_URL,
	PHARMACIST_ENUM,
	PHARMACIST_SIGNUP_URL,
	PHARMACY_ADMIN_ENUM,
	PHARMACY_REQ,
	SERVER_ERROR_REQUEST_CODE_500,
} from '../utils/Constants.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import ResetPasswordService from '../service/reset-password-service.js';

export const user = (app) => {
	const service = new UserService();
	const resetPassword = new ResetPasswordService();

	const createToken = (id, userName, type) => {
		return jwt.sign({ id, userName, type }, process.env.JWT_SECRET, {
			expiresIn: ONE_DAY_MAX_AGE_IN_MIINUTS,
		});
	};

	app.post('/signup/:request', async (req, res) => {
		try {
			const requestFrom = req.params.request; // clinic, pharmacy
			const { type } = req.body;
			delete req.body.type;
			let signupData = null;
			let email = null;
			let userName = null;
			switch (type) {
				case PATIENT_ENUM:
					email = req.body.email;
					userName = req.body.userName;
					break;
				case DOCTOR_ENUM:
				case PHARMACIST_ENUM:
					email = req.body.userData.email;
					userName = req.body.userData.userName;
					break;
				default:
					throw new Error('invalid type of user');
			}

			const checkEmail = await service.findUserByEmail(email);
			if (checkEmail) {
				throw new Error(DUB_EMAIL_ERROR_MESSAGE);
			}

			const checkUserName = await service.findUserByUserName(userName);
			if (checkUserName) {
				throw new Error(DUB_USERNAME_ERROR_MESSAGE);
			} // <= here same
			switch (requestFrom) {
				case CLINIC_REQ:
					await axios.post(DOCOTOR_CHECK_DOC_USERS, { email, userName });
					break;
				case PHARMACY_REQ:
					await axios.post(`${PHARMACIST_BASE_URL}check-pharmacist-req`, {
						email,
						userName,
					});
					break;
				default:
					throw new Error('invalid system');
			}

			if (type == PATIENT_ENUM) {
				signupData = await axios.post(PATIENT_SIGNUP_URL, req.body);
				const userId = signupData.data.userId;
				await axios.post(`${COMMUNICATION_USER_POST_URL}/${userId}`);
				await service.signupUser(signupData.data);
			}
			res.status(OK_REQUEST_CODE_200).end();
		} catch (err) {
			if (err.response) {
				res
					.status(BAD_REQUEST_CODE_400)
					.send({ message: err.response.data.errMessage });
			} else {
				res.status(BAD_REQUEST_CODE_400).send({ message: err.message });
			}
		}
	});

	//

	//
	app.delete('/users/:id', async (req, res) => {
		try {
			const userId = req.params.id;
			await service.deleteUser(userId);
			await axios.delete(`${COMMUNICATION_USER_POST_URL}/${userId}`);

			res.status(OK_REQUEST_CODE_200).end();
		} catch (err) {
			console.log(err);
			res
				.status(SERVER_ERROR_REQUEST_CODE_500)
				.send({ message: "coudn't delete the user" });
		}
	});

	app.patch('/users/:id/email/:email', async (req, res) => {
		try {
			const id = req.params.id;
			const email = req.params.email;
			const systemUser = await service.findUserByEmail(email);
			if (systemUser) {
				res
					.status(BAD_REQUEST_CODE_400)
					.send({
						errCode: DUPLICATE_KEY_ERROR_CODE,
						message: 'this email is already exist in the system',
					});
			} else {
				const systemUser = await service.updateEmail(id, email);
				//TODO: check the way of update akw
				if (systemUser) res.status(OK_REQUEST_CODE_200).end();
				else
					res
						.status(SERVER_ERROR_REQUEST_CODE_500)
						.send({ message: 'server error' });
			}
		} catch (err) {
			res.status(SERVER_ERROR_REQUEST_CODE_500).send({ message: err.message });
		}
	});

	app.post('/doctors', async (req, res) => {
		try {
			const userId = req.body.userId;
			await axios.post(`${COMMUNICATION_USER_POST_URL}/${userId}`);
			await service.signupUser(req.body);
			res.status(OK_REQUEST_CODE_200).end();
		} catch (err) {
			console.log(err.message);
			res
				.status(SERVER_ERROR_REQUEST_CODE_500)
				.send({ errMessage: "coudn't add the doctor" });
		}
	});

	app.post('/pharmacists', async (req, res) => {
		try {
			const userId = req.body.userId;
			await axios.post(`${COMMUNICATION_USER_POST_URL}/${userId}`);
			await service.signupUser(req.body);
			res.status(OK_REQUEST_CODE_200).end();
		} catch (err) {
			console.log(err.message);
			res
				.status(SERVER_ERROR_REQUEST_CODE_500)
				.send({ errMessage: "coudn't add the doctor" });
		}
	});

	app.post('/admins/:request', async (req, res) => {
		try {
			const requestFrom = req.params.request; // clinic, pharmacy
			const userName = req.body.userName;
			const email = req.body.email;

			const checkUserName = await service.findUserByUserName(userName);
			if (checkUserName) {
				throw new Error(DUB_USERNAME_ERROR_MESSAGE);
			}

			const checkEmail = await service.findUserByEmail(email);
			if (checkEmail) {
				throw new Error(DUB_EMAIL_ERROR_MESSAGE);
			}

			switch (requestFrom) {
				case CLINIC_REQ:
					await axios.post(DOCOTOR_CHECK_DOC_USERS, { email, userName });
					break;
				case PHARMACY_REQ:
					await axios.post(`${PHARMACIST_BASE_URL}check-pharmacist-req`, {
						email,
						userName,
					});
					break;
				default:
					throw new Error('invalid system');
			}

			let signupData = null;
			switch (requestFrom) {
				case CLINIC_REQ:
					signupData = await axios.post(ADMIN_Clinic_SIGNUP_URL, req.body);
					break;
				case PHARMACY_REQ:
					signupData = await axios.post(ADMIN_Pharmacy_SIGNUP_URL, req.body);
					break;
				default:
					throw new Error('invalid system');
			}

			const userId = signupData.data.userId;
			await axios.post(`${COMMUNICATION_USER_POST_URL}/${userId}`);
			await service.signupUser(signupData.data);

			res.status(OK_REQUEST_CODE_200).send({ message: 'admin added' });
		} catch (err) {
			console.log(err);
			if (err.response) {
				// coming from other services
				if (err.response.data.errCode == DUPLICATE_KEY_ERROR_CODE) {
					res
						.status(BAD_REQUEST_CODE_400)
						.send({ message: err.response.data.errMessage });
				} else
					res
						.status(BAD_REQUEST_CODE_400)
						.send({ message: err.response.data.errMessage });
			} else {
				// coming from this services
				res.status(BAD_REQUEST_CODE_400).send({ message: err.message });
			}
		}
	});

	const sendUserToken = (logedinUser, res, reset) => {
		const token = createToken(
			logedinUser.userId,
			logedinUser.userName,
			logedinUser.type,
		);
		res.cookie('jwt', token, {
			httpOnly: true,
			maxAge: ONE_DAY_MAX_AGE_IN_MILLEMIINUTS,
		});
		res.send({
			id: logedinUser.userId,
			userName: logedinUser.userName,
			type:
				logedinUser.type == PHARMACY_ADMIN_ENUM ||
				logedinUser.type == CLINIC_ADMIN_ENUM
					? ADMIN_FRONT_ENUM
					: logedinUser.type,
			reset: reset,
		});
	};
	app.post('/login/:request', async (req, res) => {
		try {
			const requestFrom = req.params.request;
			const logedinUser = await service.loginUser(req);
			switch (requestFrom) {
				case CLINIC_REQ:
					if (
						logedinUser.type == PHARMACIST_ENUM ||
						logedinUser.type == PHARMACY_ADMIN_ENUM
					)
						throw new Error('invalid user');
					break; //TODO: admin in login
				case PHARMACY_REQ:
					if (
						logedinUser.type == DOCTOR_ENUM ||
						logedinUser.type == CLINIC_ADMIN_ENUM
					)
						throw new Error('invalid user');
					break; //TODO: admin in login
				default:
					throw new Error('invalid system');
			}
			if (
				logedinUser.type == PHARMACY_ADMIN_ENUM ||
				logedinUser.type == CLINIC_ADMIN_ENUM
			) {
				logedinUser.type = ADMIN_FRONT_ENUM;
			}
			sendUserToken(logedinUser, res, false);
		} catch (err) {
			if (err.message == 'incorrect Password') {
				const userData = await service.findUserByUserName(req.body.userName);
				if (userData.email) {
					const resetUser = await resetPassword.getRecordByEmail(
						userData.email,
					);
					if (
						!resetUser ||
						new Date() > new Date(resetUser.resetTokenExpiration)
					) {
						await resetPassword.removeRecordByEmail(userData.email);
						res.status(BAD_REQUEST_CODE_400).send({ message: err.message });
					} else {
						if (req.body.password == resetUser.OTP) {
							await resetPassword.removeRecordByEmail(userData.email);
							sendUserToken(userData, res, true);
						} else
							res.status(BAD_REQUEST_CODE_400).send({ message: err.message });
					}
				} else {
					res.status(BAD_REQUEST_CODE_400).send({ message: err.message });
				}
			} else res.status(BAD_REQUEST_CODE_400).send({ message: err.message });
		}
	});

	app.get('/user/:id/email', async (req, res) => {
		try {
			const id = req.params.id;
			const email = await service.getuserEmail(id);
			res.send(email);
		} catch (err) {
			res.status(SERVER_ERROR_REQUEST_CODE_500).send({ message: err.message });
		}
	});

	app.get('/check-user', async (req, res) => {
		const token = req.cookies.jwt;
		if (token) {
			jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
				if (err) {
					res.status(401).send({ message: 'you are not Auth' });
				} else {
					res.status(200).send({
						id: decodedToken.id,
						userName: decodedToken.userName,
						type: decodedToken.type,
					});
				}
			});
		} else {
			res.status(401).send({ message: 'you are not Auth' });
		}
	});

	app.patch('/change-password/:userId', async (req, res) => {
		try {
			const userId = req.params.userId;
			const { password } = req.body;
			await service.updatePassword(userId, password);
			res.status(OK_REQUEST_CODE_200).end();
		} catch (err) {
			console.log(err);
			res.status(SERVER_ERROR_REQUEST_CODE_500).send({ message: err.message });
		}
	});

	app.get('/remove-cookie', (req, res) => {
		res.cookie('jwt', '', { expires: new Date(0), path: '/' });
		res.status(200).end();
	});

	app.get('/pharmacists/id', async (req, res) =>{
		try{
			let pharmacist = await service.getPharmacistid();
			pharmacist = pharmacist.map(element => element.userId);
			res.send(pharmacist);
		} catch(err){
			res.status(SERVER_ERROR_REQUEST_CODE_500).send({ message:err.message });
		}
	})

};


