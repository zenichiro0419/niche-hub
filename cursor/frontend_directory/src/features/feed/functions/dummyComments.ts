/**
 * コメントダミーデータ
 *
 * @概要
 *   - 複数投稿に分散した10件のダミーコメントデータ。
 *   - 各コメントはComment型に準拠。
 */
import type { Comment } from "../../../types";

export const dummyComments: Comment[] = [
  {
    id: "comment-1",
    postId: "post-1",
    userId: "user-3",
    content: "おめでとうございます！",
    createdAt: "2024-05-01T10:10:00Z",
  },
  {
    id: "comment-2",
    postId: "post-1",
    userId: "user-4",
    content: "どこで釣れましたか？",
    createdAt: "2024-05-01T10:15:00Z",
  },
  {
    id: "comment-3",
    postId: "post-2",
    userId: "user-5",
    content: "最近読んだ本なら「流浪の月」がおすすめです。",
    createdAt: "2024-05-01T11:10:00Z",
  },
  {
    id: "comment-4",
    postId: "post-3",
    userId: "user-2",
    content: "Hooks APIが特に便利ですよね。",
    createdAt: "2024-05-01T12:10:00Z",
  },
  {
    id: "comment-5",
    postId: "post-3",
    userId: "user-5",
    content: "TypeScriptとの相性も良いです。",
    createdAt: "2024-05-01T12:15:00Z",
  },
  {
    id: "comment-6",
    postId: "post-3",
    userId: "user-1",
    content: "新しいドキュメントも分かりやすいです。",
    createdAt: "2024-05-01T12:20:00Z",
  },
  {
    id: "comment-7",
    postId: "post-5",
    userId: "user-2",
    content: "参加します！",
    createdAt: "2024-05-01T14:10:00Z",
  },
  {
    id: "comment-8",
    postId: "post-7",
    userId: "user-4",
    content: "型推論でバグが減りました。",
    createdAt: "2024-05-01T16:10:00Z",
  },
  {
    id: "comment-9",
    postId: "post-7",
    userId: "user-5",
    content: "型定義がしっかりしていると安心ですね。",
    createdAt: "2024-05-01T16:15:00Z",
  },
  {
    id: "comment-10",
    postId: "post-8",
    userId: "user-2",
    content: "今度行ってみます！",
    createdAt: "2024-05-01T17:10:00Z",
  },
];
