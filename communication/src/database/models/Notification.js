import mongoose from 'mongoose';
import notificationSchema from './notificationSchema.js';

const userNotificationSchema = mongoose.Schema({
    userId:{
		type: mongoose.Schema.Types.ObjectId,
		required:[true, "user id is required"],
		unique: true,
	},
    notifications: [notificationSchema]
});

const Notification = mongoose.model('Notification', userNotificationSchema);

export default Notification;