/**
 * Community型定義
 *
 * @概要
 *   - コミュニティ情報を表す型定義。
 *
 * @主な仕様
 *   - id: コミュニティID（string）
 *   - name: コミュニティ名（string）
 *   - description: コミュニティ説明（string）
 *   - iconUrl: アイコン画像URL（string|null）
 *   - color: コミュニティカラー（string）
 *
 * @制限事項
 *   - バックエンド連携は未実装
 */

export type Community = {
  /** コミュニティID */
  id: string;
  /** コミュニティ名 */
  name: string;
  /** コミュニティ説明 */
  description: string;
  /** アイコン画像URL */
  iconUrl: string | null;
  /** コミュニティカラー */
  color: string;
};
