# NicheHub

## 概要

NicheHub は、趣味や専門分野ごとのクローズド SNS です。オニオンアーキテクチャを意識した設計で、React(TypeScript)とダミーデータにより MVP を実装しています。

## 技術構成

- フロントエンド: React.js + TypeScript
- UI: Material-UI
- フォーム: React Hook Form
- 状態管理: Redux Toolkit
- データ取得: React Query
- アニメーション: Framer Motion
- アーキテクチャ: オニオンアーキテクチャ（domain/application/infrastructure/presentation）

## ディレクトリ構成

```
├── README.md
├── 要件定義書.md
└── src
    ├── domain
    ├── application
    ├── infrastructure
    └── presentation
```

## セットアップ手順

1. Node.js（v18 以上推奨）をインストール
2. このリポジトリをクローン
3. 依存パッケージをインストール
   ```sh
   npm install
   ```
4. 開発サーバーを起動
   ```sh
   npm run dev
   ```
5. ブラウザで http://localhost:3000 を開く

## 主な仕様

- ユーザー登録/ログイン UI（ダミー認証）
- コミュニティ選択 UI
- 投稿の CRUD
- いいね機能
- コメント機能
- コミュニティ切替
- レスポンシブ対応

## 注意事項

- バックエンドはダミーデータで代用しています。
- 本番運用には Supabase 等の実 DB 連携が必要です。
