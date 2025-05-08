/**
 * Comment型定義
 *
 * @概要
 *   - コメント情報を表す型定義。
 *
 * @主な仕様
 *   - id: コメントID（string）
 *   - postId: 対象投稿ID（string）
 *   - userId: コメント投稿者ユーザーID（string）
 *   - content: コメント本文（string）
 *   - createdAt: コメント日時（ISO8601文字列）
 *
 * @制限事項
 *   - バックエンド連携は未実装
 */

export type Comment = {
  /** コメントID */
  id: string;
  /** 対象投稿ID */
  postId: string;
  /** コメント投稿者ユーザーID */
  userId: string;
  /** コメント本文 */
  content: string;
  /** コメント日時（ISO8601文字列） */
  createdAt: string;
};
