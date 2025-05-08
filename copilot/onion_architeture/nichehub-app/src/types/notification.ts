export interface Notification {
    id: string;
    userId: string;
    communityId: string;
    message: string;
    timestamp: Date;
    read: boolean;
}

export type NotificationList = Notification[];