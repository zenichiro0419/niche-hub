/**
 * 投稿関連ユースケース
 * @description 投稿の作成・更新・削除・いいね・コメント取得のアプリケーションサービス
 * @remarks
 * - application層で管理し、UIから呼び出されるビジネスロジックを実装します。
 */
import { Post } from "../domain/post";
import { Comment } from "../domain/comment";
import {
  IPostRepository,
  ICommentRepository,
} from "../infrastructure/repository";

/**
 * 投稿作成ユースケース
 * @param {IPostRepository} postRepository - 投稿リポジトリ
 * @param {Post} post - 新規投稿
 */
export function createPost(postRepository: IPostRepository, post: Post): void {
  postRepository.create(post);
}

/**
 * 投稿更新ユースケース
 * @param {IPostRepository} postRepository - 投稿リポジトリ
 * @param {Post} post - 更新投稿
 */
export function updatePost(postRepository: IPostRepository, post: Post): void {
  postRepository.update(post);
}

/**
 * 投稿削除ユースケース
 * @param {IPostRepository} postRepository - 投稿リポジトリ
 * @param {string} postId - 削除対象投稿ID
 */
export function deletePost(
  postRepository: IPostRepository,
  postId: string
): void {
  postRepository.delete(postId);
}

/**
 * 投稿へのいいね/いいね解除ユースケース
 * @param {IPostRepository} postRepository - 投稿リポジトリ
 * @param {string} postId - 投稿ID
 * @param {string} userId - いいねユーザーID
 * @returns {Post | undefined} 更新後の投稿
 */
export function toggleLike(
  postRepository: IPostRepository,
  postId: string,
  userId: string
): Post | undefined {
  const post = postRepository.findById(postId);
  if (!post) return undefined;
  const idx = post.likedUserIds.indexOf(userId);
  if (idx === -1) {
    post.likedUserIds.push(userId);
  } else {
    post.likedUserIds.splice(idx, 1);
  }
  postRepository.update(post);
  return post;
}

/**
 * 投稿のコメント一覧取得ユースケース
 * @param {ICommentRepository} commentRepository - コメントリポジトリ
 * @param {string} postId - 投稿ID
 * @returns {Comment[]} コメント一覧
 */
export function getComments(
  commentRepository: ICommentRepository,
  postId: string
): Comment[] {
  return commentRepository.findAllByPost(postId);
}
