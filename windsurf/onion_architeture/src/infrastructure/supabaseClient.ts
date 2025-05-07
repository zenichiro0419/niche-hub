// インフラ層: Supabaseクライアント（ダミー）
export const supabase = {
  auth: {
    signUp: async (email: string, password: string) => ({ user: { email }, session: null, error: null }),
    signInWithPassword: async (email: string, password: string) => ({ user: { email }, session: null, error: null })
  }
};
