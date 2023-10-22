import express from 'express';
import dotenv from 'dotenv';
import { PORT_NUMBER } from './src/utils/Constants.js';
import morgan from 'morgan';
import {payment} from './src/api/PaymentAPI.js';
import cors from 'cors';
import bodyParser from 'body-parser';


dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.json());
app.use(cors({
	origin: ['http://localhost:3000','http://localhost:3001', 'http://localhost:3002', 'http://localhost:3005'],
	credentials: true
}));


payment(app);

const port = process.env.PORT || PORT_NUMBER;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

