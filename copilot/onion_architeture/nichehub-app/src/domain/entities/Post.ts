export class Post {
    constructor(
        public id: string,
        public userId: string,
        public communityId: string,
        public content: string,
        public createdAt: Date,
        public updatedAt: Date,
        public likes: number = 0,
        public commentsCount: number = 0
    ) {}
}