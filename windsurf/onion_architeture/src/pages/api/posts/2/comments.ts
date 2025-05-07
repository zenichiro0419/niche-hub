import type { NextApiRequest, NextApiResponse } from "next";

let DUMMY_COMMENTS: { id: string; postId: string; user: string; content: string; createdAt: string }[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(DUMMY_COMMENTS);
  }
  if (req.method === "POST") {
    const { user, content } = req.body;
    if (!user || !content) return res.status(400).json({ message: "Missing fields" });
    const newComment = {
      id: `c${Math.random().toString(36).slice(2, 8)}`,
      postId: "p2",
      user,
      content,
      createdAt: new Date().toISOString(),
    };
    DUMMY_COMMENTS.push(newComment);
    return res.status(201).json(newComment);
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
