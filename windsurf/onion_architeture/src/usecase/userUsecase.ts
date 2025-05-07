// ユースケース層: ユーザー登録・認証のロジック（ダミー）
import { User } from '@domain/user';

const dummyUsers: User[] = [];

export const registerUser = (email: string, username: string, password: string): User => {
  const user: User = { id: String(Date.now()), email, username, password };
  dummyUsers.push(user);
  return user;
};

export const loginUser = (email: string, password: string): User | null => {
  return dummyUsers.find(u => u.email === email && u.password === password) || null;
};
