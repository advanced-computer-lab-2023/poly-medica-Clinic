import { DATABASE_UPDATE_ERROR_MESSAGE } from "../../utils/Constants.js";
import Notification from "../models/Notification.js";

class NotificationRepository {
    async getAllNotification(userId){
        const userNotifications = await Notification.findOne({userId}, "notifications").lean();
        return userNotifications.notifications;
    }

    async postNotification(userId, notification, type){
            await Notification.findOneAndUpdate(
                {userId},
                {$push: {"notifications": { ...notification, notificationType: type } } },
                { new: true, upsert: true, runValidators: true});
    }

    async postNotificationUser(id){
        const notificationUser = new Notification({userId: id});
        await notificationUser.save();
    }

    async patchNotificationState(userId, notificationId){
        try{
            await Notification.findOneAndUpdate(
                { userId, 'notifications._id': notificationId },
                { $set: { 'notifications.$.notificationState': true } },
                { new: true });
        } catch {
            throw new Error(DATABASE_UPDATE_ERROR_MESSAGE);
        }
    }

    async patchNotificationsState(userId){
        try{
            await Notification.findOneAndUpdate(
                { userId },
                { $set: { 'notifications.$[].notificationState': true } },
                { multi: true });
        } catch {
            throw new Error(DATABASE_UPDATE_ERROR_MESSAGE);
        }
    }
}

export default NotificationRepository