/**
 * Notification型定義
 *
 * @概要
 *   - サイト内通知情報を表す型定義。
 *
 * @主な仕様
 *   - id: 通知ID（string）
 *   - userId: 通知対象ユーザーID（string）
 *   - type: 通知種別（"like" | "comment" | "admin" など）（string）
 *   - entityId: 関連エンティティID（string）
 *   - message: 通知メッセージ（string）
 *   - isRead: 既読フラグ（boolean）
 *   - createdAt: 通知日時（ISO8601文字列）
 *
 * @制限事項
 *   - バックエンド連携は未実装
 */

export type Notification = {
  /** 通知ID */
  id: string;
  /** 通知対象ユーザーID */
  userId: string;
  /** 通知種別 */
  type: "like" | "comment" | "admin";
  /** 関連エンティティID */
  entityId: string;
  /** 通知メッセージ */
  message: string;
  /** 既読フラグ */
  isRead: boolean;
  /** 通知日時（ISO8601文字列） */
  createdAt: string;
};
