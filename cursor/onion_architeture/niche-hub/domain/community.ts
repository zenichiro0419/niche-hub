/**
 * コミュニティエンティティ
 * @description NicheHubのコミュニティを表すエンティティクラス
 * @property {string} id - コミュニティID
 * @property {string} name - コミュニティ名
 * @property {string} description - コミュニティ説明
 * @property {string} iconUrl - コミュニティアイコンURL
 * @remarks
 * - ドメイン層のエンティティとして、ビジネスロジックを保持します。
 * - 外部依存は持ちません。
 */
export class Community {
  /** コミュニティID */
  id: string;
  /** コミュニティ名 */
  name: string;
  /** コミュニティ説明 */
  description: string;
  /** コミュニティアイコンURL */
  iconUrl: string;

  /**
   * コンストラクタ
   * @param {string} id - コミュニティID
   * @param {string} name - コミュニティ名
   * @param {string} description - コミュニティ説明
   * @param {string} iconUrl - コミュニティアイコンURL
   */
  constructor(id: string, name: string, description: string, iconUrl: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.iconUrl = iconUrl;
  }
}
