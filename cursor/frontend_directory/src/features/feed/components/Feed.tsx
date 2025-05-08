/**
 * Feed コンポーネント
 *
 * @概要
 *   - 投稿作成フォーム・投稿リストを統合したフィード画面。
 *   - usePostsでロジックを管理。
 */
import React from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";
import { usePosts } from "../hooks/usePosts";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

const Feed: React.FC = () => {
  const { posts, users, likedPostIds, toggleLike, addNewPost, addComment } =
    usePosts();
  const currentUser = useSelector((state: RootState) =>
    state.user.users.find((u) => u.id === state.user.currentUserId)
  );
  const selectedCommunityId = useSelector(
    (state: RootState) => state.community.selectedCommunityId
  );

  if (!currentUser || !selectedCommunityId) return <div>読み込み中...</div>;

  // 選択中コミュニティの投稿のみ表示
  const filteredPosts = posts.filter(
    (p) => p.communityId === selectedCommunityId
  );

  return (
    <div>
      <PostForm
        onSubmit={(content) => addNewPost(content, selectedCommunityId)}
      />
      <PostList
        posts={filteredPosts}
        users={users}
        likedPostIds={likedPostIds}
        onLike={toggleLike}
        onCommentClick={addComment}
      />
    </div>
  );
};

export default Feed;
