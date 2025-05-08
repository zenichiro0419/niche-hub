/**
 * PostList コンポーネント
 *
 * @概要
 *   - 投稿一覧を無限スクロール風に表示するUIコンポーネント。
 *
 * @主な仕様
 *   - PostCardを利用し、10件ずつ表示
 *   - スクロールで追加読み込み（Intersection Observer）
 *   - ダミーデータ・propsで投稿・ユーザー情報を受け取る
 */
import React, { useRef, useCallback, useEffect, useState } from "react";
import PostCard from "./PostCard";
import type { Post, User } from "../../../types";

interface PostListProps {
  posts: Post[];
  users: User[];
  likedPostIds: string[];
  onLike: (postId: string) => void;
  onCommentClick: (postId: string) => void;
}

const PAGE_SIZE = 10;

const PostList: React.FC<PostListProps> = ({
  posts,
  users,
  likedPostIds,
  onLike,
  onCommentClick,
}) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loader = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, posts.length));
      }
    },
    [posts.length]
  );

  useEffect(() => {
    const option = { root: null, rootMargin: "20px", threshold: 1.0 };
    const observer = new window.IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]);

  return (
    <div>
      {posts.slice(0, visibleCount).map((post) => {
        const user = users.find((u) => u.id === post.userId);
        if (!user) return null;
        return (
          <PostCard
            key={post.id}
            post={post}
            user={user}
            liked={likedPostIds.includes(post.id)}
            onLike={() => onLike(post.id)}
            onCommentClick={() => onCommentClick(post.id)}
          />
        );
      })}
      <div ref={loader} />
    </div>
  );
};

export default PostList;
