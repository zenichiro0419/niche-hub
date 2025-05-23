export const dummyPosts = [
  {
    id: 1,
    userId: 1,
    communityId: 1,
    content: "これはテスト投稿です。#趣味",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    likes: 10,
    comments: [
      {
        id: 1,
        userId: 2,
        postId: 1,
        content: "素晴らしい投稿ですね！",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        userId: 3,
        postId: 1,
        content: "私も同じ趣味です！",
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: 2,
    userId: 2,
    communityId: 1,
    content: "最近の趣味について話しましょう！",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    likes: 5,
    comments: [],
  },
  {
    id: 3,
    userId: 3,
    communityId: 2,
    content: "このコミュニティに参加して嬉しいです！",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    likes: 8,
    comments: [
      {
        id: 3,
        userId: 1,
        postId: 3,
        content: "ようこそ！",
        createdAt: new Date().toISOString(),
      },
    ],
  },
];