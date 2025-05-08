import type { User } from "../../../types";

export const dummyUsers: User[] = [
  {
    id: "user-1",
    userName: "管理者ユーザー",
    email: "admin@nichehub.com",
    bio: "NicheHubの管理者です。",
    avatarUrl: null,
    isAdmin: true,
    communityIds: ["community-1", "community-2"],
  },
  {
    id: "user-2",
    userName: "山田太郎",
    email: "taro@example.com",
    bio: "釣りと写真が趣味です。",
    avatarUrl: null,
    isAdmin: false,
    communityIds: ["community-1"],
  },
  {
    id: "user-3",
    userName: "佐藤花子",
    email: "hanako@example.com",
    bio: "読書とカフェ巡りが好きです。",
    avatarUrl: null,
    isAdmin: false,
    communityIds: ["community-2"],
  },
  {
    id: "user-4",
    userName: "鈴木一郎",
    email: "ichiro@example.com",
    bio: "プログラミングとランニングが趣味。",
    avatarUrl: null,
    isAdmin: false,
    communityIds: ["community-1", "community-3"],
  },
  {
    id: "user-5",
    userName: "田中美咲",
    email: "misaki@example.com",
    bio: "映画鑑賞と旅行が好きです。",
    avatarUrl: null,
    isAdmin: false,
    communityIds: ["community-3"],
  },
];
