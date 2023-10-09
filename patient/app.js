import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { patient } from './src/api/patient.js';
import { MONGO_URI, PORT_NUMBER } from './src/utils/Constants.js';
import { checkUser } from './src/middleware/authMiddleware.js';

dotenv.config();
const app = express();
app.use(morgan('dev'));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoURL = process.env.MONGO_URI || MONGO_URI;

const connect = async () => {
	try {
		await mongoose.connect( mongoURL );
		console.log( 'Database connected' );
	} catch ( err ) {
		console.error( 'Error connecting to the database:', err );
	}
};

await connect();

app.use( express.json() );
app.use('*', checkUser);

patient( app );

const port = PORT_NUMBER;

app.listen( port, () => {
	console.log( `Server is running on port ${port}` );
} );