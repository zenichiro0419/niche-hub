import type { NextApiRequest, NextApiResponse } from "next";

// ダミーユーザーの参加コミュニティ
const USER_COMMUNITIES = {
  dummyuser: ["1", "2"],
  booklover: ["2"],
};

// ダミーポストデータ
const DUMMY_POSTS = [
  { id: "p1", communityId: "1", user: "dummyuser", content: "ようこそエンジニアの集いへ！", createdAt: "2025-05-08T09:00:00+09:00", likes: 0, reports: 0 },
  { id: "p2", communityId: "2", user: "booklover", content: "今月のおすすめ本は何ですか？", createdAt: "2025-05-08T10:00:00+09:00", likes: 0, reports: 0 },
  { id: "p3", communityId: "2", user: "dummyuser", content: "読書クラブにも参加しました！", createdAt: "2025-05-08T11:00:00+09:00", likes: 0, reports: 0 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // ユーザー名をクエリ or bodyで受け取る（本来は認証トークン）
  const user = req.query.user || req.body?.user;
  if (!user || typeof user !== "string") return res.status(400).json({ message: "user required" });
  const joined = USER_COMMUNITIES[user] || [];
  // 参加しているコミュニティの投稿のみ返す
  const feed = DUMMY_POSTS.filter((p) => joined.includes(p.communityId));
  return res.status(200).json(feed);
}
