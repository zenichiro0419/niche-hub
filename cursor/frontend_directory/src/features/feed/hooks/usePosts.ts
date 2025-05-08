/**
 * usePosts カスタムフック
 *
 * @概要
 *   - 投稿一覧の取得・いいね・コメントロジックを管理するカスタムフック。
 *
 * @主な仕様
 *   - Reduxストアから投稿・ユーザー情報を取得
 *   - いいね状態の管理・トグル
 *   - コメント追加のロジック（ダミー）
 *   - 投稿追加のロジック
 */
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store";
import { addPost, updatePost } from "../../../store/postSlice";
import type { Post } from "../../../types";
import { v4 as uuidv4 } from "uuid";

export const usePosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.posts);
  const users = useSelector((state: RootState) => state.user.users);
  const currentUserId = useSelector(
    (state: RootState) => state.user.currentUserId
  );

  // 現在のユーザーがいいねした投稿IDリスト
  const likedPostIds = posts
    .filter((post) => post.likedUserIds.includes(currentUserId!))
    .map((post) => post.id);

  // 投稿にいいねトグル
  const toggleLike = (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post || !currentUserId) return;
    const alreadyLiked = post.likedUserIds.includes(currentUserId);
    const newLikedUserIds = alreadyLiked
      ? post.likedUserIds.filter((id) => id !== currentUserId)
      : [...post.likedUserIds, currentUserId];
    dispatch(
      updatePost({
        ...post,
        likedUserIds: newLikedUserIds,
        likeCount: newLikedUserIds.length,
      })
    );
  };

  // 投稿追加
  const addNewPost = (content: string, communityId: string) => {
    if (!currentUserId) return;
    const newPost: Post = {
      id: uuidv4(),
      userId: currentUserId,
      communityId,
      content,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      likedUserIds: [],
      commentCount: 0,
    };
    dispatch(addPost(newPost));
  };

  // コメント追加（ダミー: 実際はコメントSliceで管理）
  const addComment = (postId: string) => {
    // 実装例: コメント数だけインクリメント
    const post = posts.find((p) => p.id === postId);
    if (!post) return;
    dispatch(updatePost({ ...post, commentCount: post.commentCount + 1 }));
  };

  return {
    posts,
    users,
    likedPostIds,
    toggleLike,
    addNewPost,
    addComment,
  };
};
