// ドメイン層: ユーザーエンティティ
export interface User {
  id: string;
  email: string;
  username: string;
  password?: string; // ダミー用、実運用ではハッシュ化
}
