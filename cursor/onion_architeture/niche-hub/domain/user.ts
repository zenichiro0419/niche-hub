/**
 * ユーザーエンティティ
 * @description NicheHubのユーザーを表すエンティティクラス
 * @property {string} id - ユーザーID
 * @property {string} userName - ユーザー名
 * @property {string} email - メールアドレス
 * @property {string} profileImageUrl - プロフィール画像URL
 * @property {string} bio - 自己紹介
 * @property {string[]} communityIds - 所属コミュニティIDリスト
 * @remarks
 * - ドメイン層のエンティティとして、ビジネスロジックを保持します。
 * - 外部依存は持ちません。
 */
export class User {
  /** ユーザーID */
  id: string;
  /** ユーザー名 */
  userName: string;
  /** メールアドレス */
  email: string;
  /** プロフィール画像URL */
  profileImageUrl: string;
  /** 自己紹介 */
  bio: string;
  /** 所属コミュニティIDリスト */
  communityIds: string[];

  /**
   * コンストラクタ
   * @param {string} id - ユーザーID
   * @param {string} userName - ユーザー名
   * @param {string} email - メールアドレス
   * @param {string} profileImageUrl - プロフィール画像URL
   * @param {string} bio - 自己紹介
   * @param {string[]} communityIds - 所属コミュニティIDリスト
   */
  constructor(
    id: string,
    userName: string,
    email: string,
    profileImageUrl: string,
    bio: string,
    communityIds: string[]
  ) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.profileImageUrl = profileImageUrl;
    this.bio = bio;
    this.communityIds = communityIds;
  }
}
