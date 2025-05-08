export class Notification {
    id: string;
    userId: string;
    message: string;
    timestamp: Date;
    isRead: boolean;

    constructor(id: string, userId: string, message: string, timestamp: Date, isRead: boolean = false) {
        this.id = id;
        this.userId = userId;
        this.message = message;
        this.timestamp = timestamp;
        this.isRead = isRead;
    }
}