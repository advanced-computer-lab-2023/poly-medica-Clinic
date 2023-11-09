import dotenv from 'dotenv';
import app from './app.js';
import { PORT_NUMBER } from './src/utils/Constants.js';

dotenv.config();


const port = process.env.PORT || PORT_NUMBER;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});