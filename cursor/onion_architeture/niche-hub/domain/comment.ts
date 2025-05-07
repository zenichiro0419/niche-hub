/**
 * コメントエンティティ
 * @description NicheHubのコメントを表すエンティティクラス
 * @property {string} id - コメントID
 * @property {string} postId - 対象投稿ID
 * @property {string} userId - コメント投稿者ユーザーID
 * @property {string} content - コメント内容
 * @property {string} createdAt - コメント日時（ISO8601）
 * @remarks
 * - ドメイン層のエンティティとして、ビジネスロジックを保持します。
 * - 外部依存は持ちません。
 */
export class Comment {
  /** コメントID */
  id: string;
  /** 対象投稿ID */
  postId: string;
  /** コメント投稿者ユーザーID */
  userId: string;
  /** コメント内容 */
  content: string;
  /** コメント日時（ISO8601） */
  createdAt: string;

  /**
   * コンストラクタ
   * @param {string} id - コメントID
   * @param {string} postId - 対象投稿ID
   * @param {string} userId - コメント投稿者ユーザーID
   * @param {string} content - コメント内容
   * @param {string} createdAt - コメント日時（ISO8601）
   */
  constructor(
    id: string,
    postId: string,
    userId: string,
    content: string,
    createdAt: string
  ) {
    this.id = id;
    this.postId = postId;
    this.userId = userId;
    this.content = content;
    this.createdAt = createdAt;
  }
}
