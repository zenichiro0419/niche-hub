/**
 * リポジトリインターフェースおよびダミー実装
 * @description ドメインモデルのデータ取得・操作を行うリポジトリのインターフェースと、ダミーデータを用いた実装
 * @remarks
 * - infrastructure層で管理し、将来的なDB連携に備えます。
 */
import { User } from "../domain/user";
import { Community } from "../domain/community";
import { Post } from "../domain/post";
import { Comment } from "../domain/comment";
import {
  dummyUsers,
  dummyCommunities,
  dummyPosts,
  dummyComments,
} from "./dummyData";

/** ユーザーリポジトリインターフェース */
export interface IUserRepository {
  findById(id: string): User | undefined;
  findByEmail(email: string): User | undefined;
  create(user: User): void;
}

/** コミュニティリポジトリインターフェース */
export interface ICommunityRepository {
  findAll(): Community[];
  findById(id: string): Community | undefined;
}

/** 投稿リポジトリインターフェース */
export interface IPostRepository {
  findAllByCommunity(communityId: string): Post[];
  findById(id: string): Post | undefined;
  create(post: Post): void;
  update(post: Post): void;
  delete(id: string): void;
}

/** コメントリポジトリインターフェース */
export interface ICommentRepository {
  findAllByPost(postId: string): Comment[];
  create(comment: Comment): void;
}

/** ダミーユーザーリポジトリ実装 */
export class DummyUserRepository implements IUserRepository {
  private users = dummyUsers;
  findById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }
  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }
  create(user: User): void {
    this.users.push(user);
  }
}

/** ダミーコミュニティリポジトリ実装 */
export class DummyCommunityRepository implements ICommunityRepository {
  private communities = dummyCommunities;
  findAll(): Community[] {
    return this.communities;
  }
  findById(id: string): Community | undefined {
    return this.communities.find((c) => c.id === id);
  }
}

/** ダミー投稿リポジトリ実装 */
export class DummyPostRepository implements IPostRepository {
  private posts = dummyPosts;
  findAllByCommunity(communityId: string): Post[] {
    return this.posts.filter((p) => p.communityId === communityId);
  }
  findById(id: string): Post | undefined {
    return this.posts.find((p) => p.id === id);
  }
  create(post: Post): void {
    this.posts.push(post);
  }
  update(post: Post): void {
    const idx = this.posts.findIndex((p) => p.id === post.id);
    if (idx !== -1) this.posts[idx] = post;
  }
  delete(id: string): void {
    this.posts = this.posts.filter((p) => p.id !== id);
  }
}

/** ダミーコメントリポジトリ実装 */
export class DummyCommentRepository implements ICommentRepository {
  private comments = dummyComments;
  findAllByPost(postId: string): Comment[] {
    return this.comments.filter((c) => c.postId === postId);
  }
  create(comment: Comment): void {
    this.comments.push(comment);
  }
}
