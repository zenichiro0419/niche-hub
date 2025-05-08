/**
 * PostCard Storybook
 *
 * @概要
 *   - PostCardコンポーネントのバリエーションをStorybookで表示
 */
import React from "react";
import PostCard from "./PostCard";
import type { Post, User } from "../../../types";
import { action } from "@storybook/addon-actions";

export default {
  title: "features/feed/PostCard",
  component: PostCard,
};

const user: User = {
  id: "user-1",
  userName: "テストユーザー",
  email: "test@example.com",
  bio: "テスト用ユーザー",
  avatarUrl: null,
  isAdmin: false,
  communityIds: ["community-1"],
};

const basePost: Post = {
  id: "post-1",
  userId: "user-1",
  communityId: "community-1",
  content: "これはテスト投稿です。",
  createdAt: new Date().toISOString(),
  likeCount: 1,
  likedUserIds: ["user-1"],
  commentCount: 2,
};

export const Default = () => (
  <PostCard
    post={basePost}
    user={user}
    liked={false}
    onLike={action("onLike")}
    onCommentClick={action("onCommentClick")}
  />
);

export const Liked = () => (
  <PostCard
    post={{ ...basePost, likeCount: 5 }}
    user={user}
    liked={true}
    onLike={action("onLike")}
    onCommentClick={action("onCommentClick")}
  />
);

export const WithComments = () => (
  <PostCard
    post={{ ...basePost, commentCount: 10 }}
    user={user}
    liked={false}
    onLike={action("onLike")}
    onCommentClick={action("onCommentClick")}
  />
);
