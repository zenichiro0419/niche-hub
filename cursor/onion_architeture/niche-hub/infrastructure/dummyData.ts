/**
 * ダミーデータ管理
 * @description NicheHubのMVP用ダミーデータ（ユーザー・コミュニティ・投稿・コメント）
 * @remarks
 * - infrastructure層で管理し、将来的なDB連携に備えます。
 */
import { User } from "../domain/user";
import { Community } from "../domain/community";
import { Post } from "../domain/post";
import { Comment } from "../domain/comment";

/** ユーザーダミーデータ */
export const dummyUsers: User[] = [
  new User("u1", "山田太郎", "taro@example.com", "", "釣り好きエンジニア", [
    "c1",
  ]),
  new User("u2", "佐藤花子", "hanako@example.com", "", "カメラと旅行が趣味", [
    "c2",
  ]),
];

/** コミュニティダミーデータ */
export const dummyCommunities: Community[] = [
  new Community("c1", "釣り", "釣り好きが集まるコミュニティ", ""),
  new Community("c2", "カメラ", "カメラ愛好家のためのコミュニティ", ""),
  new Community("c3", "プログラミング", "エンジニア交流コミュニティ", ""),
];

/** 投稿ダミーデータ */
export const dummyPosts: Post[] = [
  new Post(
    "p1",
    "u1",
    "c1",
    "今日は大物が釣れました！",
    "2024-06-01T10:00:00Z",
    ["u2"]
  ),
  new Post(
    "p2",
    "u2",
    "c2",
    "新しいレンズを買いました。",
    "2024-06-01T11:00:00Z",
    ["u1"]
  ),
];

/** コメントダミーデータ */
export const dummyComments: Comment[] = [
  new Comment(
    "cm1",
    "p1",
    "u2",
    "おめでとうございます！",
    "2024-06-01T10:05:00Z"
  ),
  new Comment(
    "cm2",
    "p2",
    "u1",
    "どんなレンズですか？",
    "2024-06-01T11:10:00Z"
  ),
];
