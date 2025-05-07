// ドメイン層: 投稿エンティティ
export interface Post {
  id: string;
  communityId: string;
  userId: string;
  content: string;
  createdAt: string;
  likeCount: number;
}
