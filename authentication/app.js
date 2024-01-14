import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { user } from './src/api/user.js';
import { resetPassword } from './src/api/resetPassword.js';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import { default as swaggerFile } from './src/swagger/swagger.json' assert { type: "json" };


const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
	origin: ['http://localhost:3000','http://localhost:3001'],
	credentials: true,
}));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

user(app);
resetPassword(app);

export default app;

