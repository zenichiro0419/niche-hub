export type User = {
    id: string;
    username: string;
    email: string;
    profileImage?: string;
    communities: string[];
};

export type Post = {
    id: string;
    userId: string;
    communityId: string;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
    likes: number;
    commentsCount: number;
};

export type Community = {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    members: string[];
};

export type Comment = {
    id: string;
    postId: string;
    userId: string;
    content: string;
    createdAt: Date;
};

export type Notification = {
    id: string;
    userId: string;
    type: 'like' | 'comment' | 'follow';
    message: string;
    createdAt: Date;
    isRead: boolean;
};