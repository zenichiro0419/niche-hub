/**
 * 投稿エンティティ
 * @description NicheHubの投稿を表すエンティティクラス
 * @property {string} id - 投稿ID
 * @property {string} userId - 投稿者ユーザーID
 * @property {string} communityId - 所属コミュニティID
 * @property {string} content - 投稿内容
 * @property {string} createdAt - 投稿日時（ISO8601）
 * @property {string[]} likedUserIds - いいねしたユーザーIDリスト
 * @remarks
 * - ドメイン層のエンティティとして、ビジネスロジックを保持します。
 * - 外部依存は持ちません。
 */
export class Post {
  /** 投稿ID */
  id: string;
  /** 投稿者ユーザーID */
  userId: string;
  /** 所属コミュニティID */
  communityId: string;
  /** 投稿内容 */
  content: string;
  /** 投稿日時（ISO8601） */
  createdAt: string;
  /** いいねしたユーザーIDリスト */
  likedUserIds: string[];

  /**
   * コンストラクタ
   * @param {string} id - 投稿ID
   * @param {string} userId - 投稿者ユーザーID
   * @param {string} communityId - 所属コミュニティID
   * @param {string} content - 投稿内容
   * @param {string} createdAt - 投稿日時（ISO8601）
   * @param {string[]} likedUserIds - いいねしたユーザーIDリスト
   */
  constructor(
    id: string,
    userId: string,
    communityId: string,
    content: string,
    createdAt: string,
    likedUserIds: string[]
  ) {
    this.id = id;
    this.userId = userId;
    this.communityId = communityId;
    this.content = content;
    this.createdAt = createdAt;
    this.likedUserIds = likedUserIds;
  }
}
