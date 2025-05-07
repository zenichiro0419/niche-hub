/**
 * ユーザー関連ユースケース
 * @description ユーザー登録・ログイン・コミュニティ選択のアプリケーションサービス
 * @remarks
 * - application層で管理し、UIから呼び出されるビジネスロジックを実装します。
 */
import { User } from "../domain/user";
import { IUserRepository } from "../infrastructure/repository";

/**
 * ユーザー登録ユースケース
 * @param {IUserRepository} userRepository - ユーザーリポジトリ
 * @param {string} userName - ユーザー名
 * @param {string} email - メールアドレス
 * @param {string} password - パスワード（ダミー用途・未使用）
 * @returns {User} 登録ユーザー
 */
export function registerUser(
  userRepository: IUserRepository,
  userName: string,
  email: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  password: string
): User {
  // ダミーID生成
  const id = "u" + Math.random().toString(36).substring(2, 8);
  const user = new User(id, userName, email, "", "", []);
  userRepository.create(user);
  return user;
}

/**
 * ログインユースケース
 * @param {IUserRepository} userRepository - ユーザーリポジトリ
 * @param {string} email - メールアドレス
 * @param {string} password - パスワード（ダミー用途）
 * @returns {User | undefined} ログインユーザー
 */
export function loginUser(
  userRepository: IUserRepository,
  email: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  password: string
): User | undefined {
  return userRepository.findByEmail(email);
}

/**
 * コミュニティ選択ユースケース
 * @param {User} user - 対象ユーザー
 * @param {string[]} communityIds - 選択コミュニティIDリスト
 * @returns {User} 更新後ユーザー
 */
export function selectCommunities(user: User, communityIds: string[]): User {
  user.communityIds = communityIds;
  return user;
}
