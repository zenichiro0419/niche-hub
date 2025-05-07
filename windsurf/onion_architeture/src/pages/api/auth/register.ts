import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }
  // TODO: Implement actual user registration logic (e.g., save to DB)
  return res.status(200).json({ message: "Registered" });
}
