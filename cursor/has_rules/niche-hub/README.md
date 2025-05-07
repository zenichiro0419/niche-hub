# NicheHub

NicheHubは、趣味や専門分野に特化したクローズドSNSのMVP（最小実行製品）です。React/TypeScriptとViteを用いて開発されています。

## プロジェクト概要

- 趣味や専門分野ごとのコミュニティで安心して交流できるSNS
- 本リポジトリはMVPのフロントエンド実装（ダミーデータ利用）
- バックエンド連携や認証は今後実装予定

## 技術スタック

- フレームワーク: React 18 + TypeScript
- ビルドツール: Vite
- UIコンポーネント: Material-UI (MUI)
- フォーム管理: React Hook Form
- 状態管理: Redux Toolkit
- データフェッチ: React Query
- アニメーション: Framer Motion
- コード品質: ESLint, Prettier
- テスト: Jest, React Testing Library

## セットアップ手順

1. リポジトリをクローン
2. 依存パッケージをインストール
3. 開発サーバーを起動

```bash
# クローン後、プロジェクトディレクトリへ移動
cd niche-hub

# 依存パッケージのインストール
npm install

# 開発サーバー起動（localhost:3000でアクセス可能）
npm run dev
```

## 利用方法

- `localhost:5174` にアクセスし、ログイン画面・フィード画面を確認できます（ダミーデータ動作）
- バックエンド連携や本格的な認証は未実装です

## ディレクトリ構成（抜粋）

- `src/` ... ソースコード
  - `components/` ... UIコンポーネント
  - `pages/` ... 各画面
  - `store/` ... 状態管理
  - `types/` ... 型定義
  - `utils/` ... ユーティリティ

## ライセンス

- 本リポジトリは開発用サンプルです。
