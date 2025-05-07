import type { NextApiRequest, NextApiResponse } from "next";

const DUMMY_COMMUNITIES = [
  { id: "1", name: "エンジニアの集い", description: "エンジニア同士で交流するコミュニティ", iconUrl: "" },
  { id: "2", name: "読書クラブ", description: "本好きが集まる場所", iconUrl: "" },
  { id: "3", name: "アウトドア同好会", description: "アウトドア活動を楽しむ人の集まり", iconUrl: "" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  return res.status(200).json(DUMMY_COMMUNITIES);
}
