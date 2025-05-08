/**
 * PostCard ユニットテスト
 *
 * @概要
 *   - PostCardのUI表示・ボタン動作をテスト
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PostCard from "../components/PostCard";
import type { Post, User } from "../../../types";

describe("PostCard", () => {
  const user: User = {
    id: "user-1",
    userName: "テストユーザー",
    email: "test@example.com",
    bio: "",
    avatarUrl: null,
    isAdmin: false,
    communityIds: ["community-1"],
  };
  const post: Post = {
    id: "post-1",
    userId: "user-1",
    communityId: "community-1",
    content: "テスト投稿本文",
    createdAt: new Date().toISOString(),
    likeCount: 2,
    likedUserIds: ["user-1"],
    commentCount: 3,
  };

  it("ユーザー名・本文・いいね・コメント数が表示される", () => {
    render(
      <PostCard
        post={post}
        user={user}
        liked={false}
        onLike={() => {}}
        onCommentClick={() => {}}
      />
    );
    expect(screen.getByText("テストユーザー")).toBeInTheDocument();
    expect(screen.getByText("テスト投稿本文")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument(); // いいね数
    expect(screen.getByText("3")).toBeInTheDocument(); // コメント数
  });

  it("いいねボタンをクリックするとonLikeが呼ばれる", () => {
    const onLike = jest.fn();
    render(
      <PostCard
        post={post}
        user={user}
        liked={false}
        onLike={onLike}
        onCommentClick={() => {}}
      />
    );
    fireEvent.click(screen.getByLabelText("いいね"));
    expect(onLike).toHaveBeenCalled();
  });
});
