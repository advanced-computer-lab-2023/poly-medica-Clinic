const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDBTest = async () => {
	try{
		const mongoURL = process.env.MONGO_URI_TEST;
		await mongoose.connect(mongoURL);
	} catch(err){
		console.error('Error connecting to the database:', err.message);
	}
};

const disconnectDBTest = async () => {
	try{
		await mongoose.disconnect();
	} catch(err){
		console.error('Error connecting to the database:', err.message);
	}
};

const dropDBTest = async () => {
	try {
		await mongoose.connection.db.dropDatabase();

	} catch (err) {
		console.error('error dropping the db', err)
	}
}

export { connectDBTest, disconnectDBTest, dropDBTest };