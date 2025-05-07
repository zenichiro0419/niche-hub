import type { NextApiRequest, NextApiResponse } from "next";

let DUMMY_POSTS: { id: string; communityId: string; user: string; content: string; createdAt: string }[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(DUMMY_POSTS);
  }
  if (req.method === "POST") {
    const { user, content } = req.body;
    if (!user || !content) return res.status(400).json({ message: "Missing fields" });
    const newPost = {
      id: `p${Math.random().toString(36).slice(2, 8)}`,
      communityId: "3",
      user,
      content,
      createdAt: new Date().toISOString(),
    };
    DUMMY_POSTS.push(newPost);
    return res.status(201).json(newPost);
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
