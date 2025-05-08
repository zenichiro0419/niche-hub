export interface Post {
    id: string;
    userId: string;
    communityId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    likes: number;
    commentsCount: number;
}

export interface CreatePostInput {
    userId: string;
    communityId: string;
    content: string;
}

export interface UpdatePostInput {
    id: string;
    content: string;
}