import type { NextApiRequest, NextApiResponse } from "next";

let DUMMY_COMMENTS = {
  "p1": [
    { id: "c1", postId: "p1", user: "dummyuser", content: "最初のコメント", createdAt: "2025-05-08", likes: 0, reports: 0 },
  ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // コメントID
  const comment = Object.values(DUMMY_COMMENTS).flat().find((c: any) => c.id === id);
  if (!comment) return res.status(404).json({ message: "Not found" });

  if (req.method === "PUT") {
    const { content } = req.body;
    comment.content = content;
    return res.status(200).json(comment);
  }
  if (req.method === "DELETE") {
    for (const key in DUMMY_COMMENTS) {
      DUMMY_COMMENTS[key] = DUMMY_COMMENTS[key].filter((c: any) => c.id !== id);
    }
    return res.status(200).json({ message: "deleted" });
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
