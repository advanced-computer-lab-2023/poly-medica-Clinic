import mongoose from 'mongoose';
import { NORMAL_NOTIFICATION_TYPE_ENUM, NOTIFICATION_BODY_REQUIRE_MESSAGE, NOTIFICATION_HEAD_REQUIRE_MESSAGE, NOTIFICATION_SENDER_NAME_REQUIRE_MESSAGE, NOTIFICATION_TYPE_ENUM, NOTIFICATION_TYPE_REQUIRE_MESSAGE } from '../../utils/Constants.js';

const notificationSchema = mongoose.Schema({
	notificationHead: {
		type:String,
		required: [true, NOTIFICATION_HEAD_REQUIRE_MESSAGE]
	},
	notificationBody:{
		type:String,
		required: [true, NOTIFICATION_BODY_REQUIRE_MESSAGE]
	},
	senderName:{
		type:String,
		required: [function (){
			return this.notificationType !== NORMAL_NOTIFICATION_TYPE_ENUM;
		}, NOTIFICATION_SENDER_NAME_REQUIRE_MESSAGE]
	},
	senderImage:{
		type:String
	},
	notificationType:{
		type:String,
		enum:NOTIFICATION_TYPE_ENUM,
		required: [true, NOTIFICATION_TYPE_REQUIRE_MESSAGE]
	},
	notificationState: { // seen & unseen
		type:Boolean,
		required: true,
		default: false
	}
}, { timestamps: true } );

export default notificationSchema;