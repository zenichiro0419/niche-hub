import type { NextApiRequest, NextApiResponse } from "next";

let DUMMY_COMMENTS = {
  "p1": [
    { id: "c1", postId: "p1", user: "dummyuser", content: "最初のコメント", createdAt: "2025-05-08", likes: 0, reports: 0 },
  ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const comment = Object.values(DUMMY_COMMENTS).flat().find((c: any) => c.id === id);
  if (!comment) return res.status(404).json({ message: "Not found" });

  if (req.method === "POST") {
    comment.reports = (comment.reports || 0) + 1;
    return res.status(200).json(comment);
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
