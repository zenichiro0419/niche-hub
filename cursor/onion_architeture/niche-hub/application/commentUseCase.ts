/**
 * コメント関連ユースケース
 * @description コメントの作成を行うアプリケーションサービス
 * @remarks
 * - application層で管理し、UIから呼び出されるビジネスロジックを実装します。
 */
import { Comment } from "../domain/comment";
import { ICommentRepository } from "../infrastructure/repository";

/**
 * コメント作成ユースケース
 * @param {ICommentRepository} commentRepository - コメントリポジトリ
 * @param {Comment} comment - 新規コメント
 */
export function createComment(
  commentRepository: ICommentRepository,
  comment: Comment
): void {
  commentRepository.create(comment);
}
