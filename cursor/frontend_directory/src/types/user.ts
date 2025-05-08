/**
 * User型定義
 *
 * @概要
 *   - ユーザー情報を表す型定義。
 *
 * @主な仕様
 *   - id: ユーザーID（string）
 *   - userName: ユーザー名（string）
 *   - email: メールアドレス（string）
 *   - bio: 自己紹介（string）
 *   - avatarUrl: プロフィール画像URL（string|null）
 *   - isAdmin: 管理者フラグ（boolean）
 *   - communityIds: 所属コミュニティID配列（string[]）
 *
 * @制限事項
 *   - バックエンド連携は未実装
 */

export type User = {
  /** ユーザーID */
  id: string;
  /** ユーザー名 */
  userName: string;
  /** メールアドレス */
  email: string;
  /** 自己紹介 */
  bio: string;
  /** プロフィール画像URL */
  avatarUrl: string | null;
  /** 管理者フラグ */
  isAdmin: boolean;
  /** 所属コミュニティID配列 */
  communityIds: string[];
};
