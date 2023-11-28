import mongoose from 'mongoose';
import { NORMAL_NOTIFICATION_TYPE_ENUM, NOTIFICATION_TYPE_ENUM } from '../../utils/Constants.js';

const notificationSchema = mongoose.Schema({
        notificationHead: {
            type:String,
            required: [true, "notification type is required"]
        },
        notificationBody:{
            type:String,
            required: [true, "notification type is required"]
        },
        senderName:{
            type:String,
            required: [function (){
                return this.notificationType !== NORMAL_NOTIFICATION_TYPE_ENUM
            }, "sender name is required"]
        },
        senderImage:{
            type:String
        },
        notificationType:{
            type:String,
            enum:NOTIFICATION_TYPE_ENUM,
            required: [true, "notification type is required"]
        },
        notificationState: {// seen & unseen
            type:Boolean,
            required: true,
            default: false
        }
}, { timestamps: true } );

export default notificationSchema;