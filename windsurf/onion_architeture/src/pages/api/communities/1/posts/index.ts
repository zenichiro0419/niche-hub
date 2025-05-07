import type { NextApiRequest, NextApiResponse } from "next";

// コミュニティIDごとに投稿を管理
const DUMMY_POSTS: { [communityId: string]: any[] } = {
  "1": [
    { id: "p1", communityId: "1", user: "dummyuser", content: "ようこそエンジニアの集いへ！", createdAt: "2025-05-08" },
  ],
  "2": [],
  "3": [],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = "1";
  if (req.method === "GET") {
    return res.status(200).json(DUMMY_POSTS[id] || []);
  }
  if (req.method === "POST") {
    const { user, content } = req.body;
    if (!user || !content) return res.status(400).json({ message: "Missing fields" });
    const newPost = {
      id: `p${Math.random().toString(36).slice(2, 8)}`,
      communityId: id,
      user,
      content,
      createdAt: new Date().toISOString(),
    };
    if (!DUMMY_POSTS[id]) DUMMY_POSTS[id] = [];
    DUMMY_POSTS[id].push(newPost);
    return res.status(201).json(newPost);
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
