// ドメイン層: コメントエンティティ
export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
}
