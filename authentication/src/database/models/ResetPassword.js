import mongoose from 'mongoose';

const resetSchema = mongoose.Schema({
	email: {
		type:String,
		required:true
	},
	OTP: {
		type:String,
		required:true
	},
	resetTokenExpiration: {
		type:Date,
		required:true,
		default: new Date((new Date()).getTime() + 24 * 60 * 60 * 1000)
	},
});

const ResetPassword = mongoose.model('ResetPassword', resetSchema);

export default ResetPassword;