import type { NextApiRequest, NextApiResponse } from "next";

let DUMMY_POSTS = {
  "1": [
    { id: "p1", communityId: "1", user: "dummyuser", content: "ようこそエンジニアの集いへ！", createdAt: "2025-05-08", likes: 0, reports: 0 },
  ],
  "2": [],
  "3": [],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const post = Object.values(DUMMY_POSTS).flat().find((p: any) => p.id === id);
  if (!post) return res.status(404).json({ message: "Not found" });

  if (req.method === "PUT") {
    const { content } = req.body;
    post.content = content;
    return res.status(200).json(post);
  }
  if (req.method === "DELETE") {
    for (const key in DUMMY_POSTS) {
      DUMMY_POSTS[key] = DUMMY_POSTS[key].filter((p: any) => p.id !== id);
    }
    return res.status(200).json({ message: "deleted" });
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
