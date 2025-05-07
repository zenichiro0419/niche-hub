import type { NextApiRequest, NextApiResponse } from "next";

// ダミーユーザーデータ
const DUMMY_USER = {
  email: "dummy@example.com",
  password: "password123",
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }
  // ダミーユーザー認証
  if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
    return res.status(200).json({ message: "Login success" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
}
