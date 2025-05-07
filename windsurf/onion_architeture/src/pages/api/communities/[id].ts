import type { NextApiRequest, NextApiResponse } from "next";

const DUMMY_COMMUNITIES = [
  {
    id: "1",
    name: "エンジニアの集い",
    description: "エンジニア同士で交流するコミュニティ",
    iconUrl: "",
  },
  {
    id: "2",
    name: "読書クラブ",
    description: "本好きが集まる場所",
    iconUrl: "",
  },
  {
    id: "3",
    name: "アウトドア同好会",
    description: "アウトドア活動を楽しむ人の集まり",
    iconUrl: "",
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const community = DUMMY_COMMUNITIES.find((c) => c.id === id);
  if (!community) return res.status(404).json({ message: "Not found" });
  if (req.method === "GET") {
    // 最新の投稿リストを /api/communities/[id]/posts から取得
    const baseUrl = req.headers.host ? `http://${req.headers.host}` : "";
    const postsRes = await fetch(`${baseUrl}/api/communities/${id}/posts`);
    const posts = await postsRes.json();
    return res.status(200).json({ ...community, posts });
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
