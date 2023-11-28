import NotificationRepository from "../database/repository/notification-repository.js";

class NotificationService {
    constructor(){
        this.repository = new NotificationRepository();
    }

    async getAllNotification(userId){
        const notifications = await this.repository.getAllNotification(userId);
        return notifications;
    }

    async postNotification(userId, notification, type){
        await this.repository.postNotification(userId, notification, type);
    }

    async postNotificationUser(userId){
        await this.repository.postNotificationUser(userId);
    }

    async patchNotificationState(userId, notificationId){
        await this.repository.patchNotificationState(userId, notificationId);
    }

    async patchNotificationsState(userId){
        await this.repository.patchNotificationsState(userId);
    }
}

export default NotificationService;