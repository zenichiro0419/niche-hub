/**
 * Post型定義
 *
 * @概要
 *   - 投稿情報を表す型定義。
 *
 * @主な仕様
 *   - id: 投稿ID（string）
 *   - userId: 投稿者ユーザーID（string）
 *   - communityId: 所属コミュニティID（string）
 *   - content: 投稿本文（string）
 *   - createdAt: 投稿日時（ISO8601文字列）
 *   - likeCount: いいね数（number）
 *   - likedUserIds: いいねしたユーザーID配列（string[]）
 *   - commentCount: コメント数（number）
 *
 * @制限事項
 *   - バックエンド連携は未実装
 */

export type Post = {
  /** 投稿ID */
  id: string;
  /** 投稿者ユーザーID */
  userId: string;
  /** 所属コミュニティID */
  communityId: string;
  /** 投稿本文 */
  content: string;
  /** 投稿日時（ISO8601文字列） */
  createdAt: string;
  /** いいね数 */
  likeCount: number;
  /** いいねしたユーザーID配列 */
  likedUserIds: string[];
  /** コメント数 */
  commentCount: number;
};
