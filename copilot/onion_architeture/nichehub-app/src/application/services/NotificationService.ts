import { Notification } from '../../domain/entities/Notification';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { INotificationRepository } from '../../domain/repositories/INotificationRepository';

export class NotificationService {
    private notificationRepository: INotificationRepository;
    private userRepository: IUserRepository;

    constructor(notificationRepository: INotificationRepository, userRepository: IUserRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    async getUserNotifications(userId: string): Promise<Notification[]> {
        return await this.notificationRepository.getNotificationsByUserId(userId);
    }

    async markNotificationAsRead(notificationId: string): Promise<void> {
        await this.notificationRepository.updateNotificationStatus(notificationId, true);
    }

    async createNotification(notification: Notification): Promise<Notification> {
        return await this.notificationRepository.createNotification(notification);
    }
}