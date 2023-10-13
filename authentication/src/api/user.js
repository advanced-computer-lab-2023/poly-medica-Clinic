import UserService from '../service/user-service.js';
import { ADMIN_ENUM, ADMIN_SIGNUP_URL, BAD_REQUEST_CODE_400, DOCOTOR_CHECK_DOC_USERS, DOCOTOR_SIGNUP_URL, DOCTOR_ENUM, DUB_EMAIL_ERROR_MESSAGE, DUB_USERNAME_ERROR_MESSAGE, DUPLICATE_KEY_ERROR_CODE, OK_REQUEST_CODE_200, ONE_DAY_MAX_AGE_IN_MIINUTS, ONE_DAY_MAX_AGE_IN_MILLEMIINUTS, PATIENT_ENUM, PATIENT_SIGNUP_URL } from '../utils/Constants.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';



export const user = (app) => {
	const user = new UserService();

	const createToken = (id, userName, type) => {
		return jwt.sign({ id, userName, type }, process.env.JWT_SECRET, {
			expiresIn: ONE_DAY_MAX_AGE_IN_MIINUTS
		});
	};


	app.post('/signup', async (req, res) => {
		try{
			const { type } = req.body;
			delete req.body.type;
			let signupData = null;
			let email = null;
			let userName = null;
			switch(type){
			case PATIENT_ENUM:email = req.body.email; userName = req.body.userName;break;
			case DOCTOR_ENUM:case ADMIN_ENUM: email = req.body.userData.email; userName = req.body.userData.userName;break;
			default: throw new Error('invalid type of user');
			}
			const checkEmail = await user.findUserByEmail(email);
			if(checkEmail){
				throw new Error(DUB_EMAIL_ERROR_MESSAGE);
			}

			const checkUserName = await user.findUserByUserName(userName);
			if(checkUserName){
				throw new Error(DUB_USERNAME_ERROR_MESSAGE);
			}
            
			await axios.get(DOCOTOR_CHECK_DOC_USERS, { email, userName });
			switch(type){
			case PATIENT_ENUM:signupData = await axios.post(PATIENT_SIGNUP_URL, req.body);break;
			case DOCTOR_ENUM: signupData = await axios.post(DOCOTOR_SIGNUP_URL, req.body);break; 
			case ADMIN_ENUM: signupData = await axios.post(ADMIN_SIGNUP_URL, req.body);break;
			default: throw new Error('invalid type of user');
			}
			console.log({ signupData });
			if(type != DOCTOR_ENUM){
				await user.signupUser(signupData.data);
			}
			res.status(OK_REQUEST_CODE_200).end();
            
		} catch(err){
			if(err.response){
				if(err.response.data.errCode == DUPLICATE_KEY_ERROR_CODE){
					res.status(BAD_REQUEST_CODE_400).send({ message: err.response.data.errMessage });
				}
				else res.status(BAD_REQUEST_CODE_400).send({ message:err.response.data.errMessage });
			} else{
				res.status(BAD_REQUEST_CODE_400).send({ message: err.message });
			}
		}
	});

	app.post('/login', async (req, res) => {
		try{
			const logedinUser = await user.loginUser(req);
			const token = createToken(logedinUser.userId, logedinUser.userName,  logedinUser.type);
			res.cookie('jwt', token, { httpOnly: true, maxAge: ONE_DAY_MAX_AGE_IN_MILLEMIINUTS });
			res.send({ id:logedinUser.userId, name:logedinUser.userName, type: logedinUser.type, token: token });
		} catch(err){
			res.status(BAD_REQUEST_CODE_400).send({ message: err.message });
		}
	});

	app.get('/check-user', async (req, res) => {
		const token = req.cookies.jwt;
		if (token) {
			jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
				if (err) {
					res.status(401).send({ message: 'you are not Auth' });
				} else {
					res.status(200).send({ id: decodedToken.id, userName: decodedToken.userName , type: decodedToken.type });
				}
			});
		} else {
			res.status(401).send({ message: 'you are not Auth' });
		}
	});

	app.get('/remove-cookie', (req, res) => {
		res.cookie('jwt', '', { expires: new Date(0), path: '/' });
		res.status(200).end();
	});
};