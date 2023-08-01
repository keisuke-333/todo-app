# Todo App (Next.js, Prisma, TypeScript, tRPC, TailwindCSS)

このリポジトリは、CRUD 機能が備わったシンプルな Todo アプリケーションのソースコードです。

## 目次

- [概要](#概要)
- [画面設計](#画面設計)
- [実装について](#実装について)
- [考慮したポイント](#考慮したポイント)
- [ローカル開発環境構築](#ローカル開発環境構築)
- [ローカル開発サーバーの起動](#ローカル開発サーバーの起動)

## 概要

このアプリケーションは、T3 Stack（Next.js、Prisma、TypeScript、tRPC）を使用して作成された Todo リストアプリケーションです。ユーザーは新しい Todo を作成、編集、削除することができ、Todo の完了状態も切り替えることができます。また、Todo リストはページネーションにより 5 件ずつ表示され、特定の文字列で Todo を検索することも可能です。さらに、`All` `Active` `Done`で Todo リストをフィルタリングすることができます。データ管理には Prisma と Supabase が使用されています。デザインには Tailwind CSS が使用されています。本アプリケーションは Vercel でホスティングされています。

## 画面設計

このアプリケーションはシングルページアプリケーションです。中心となるコンポーネントは`TodoListTemplate`で、ここで Todo リストを表示しています。ユーザーは Todo 項目のチェックボックスを切り替えて項目の完了状態を変更することができます。また、項目自体をクリックすると編集モードになります。ユーザーは項目の削除も行うことができます。  
画面設計には Atomic Design が採用されています。UI を分割するための方法論として、原子（atoms）、分子（molecules）、有機体（organisms）、テンプレート（templates）のレベルでコンポーネントを作成し、それらを組み合わせてアプリケーションを作成しています。

## 実装について

Next.js と TypeScript を使用してフロントエンドを実装し、Prisma と Supabase を使用してデータの永続化を行っています。API エンドポイントは tRPC を使用して作成しています。各 Todo 項目は、独立したコンポーネントとして実装され、状態管理は React の useState のみで実装されています。

データベースの構造については以下の図を参照してください。

```mermaid
erDiagram
  todos {
    id string(cuid) PK
    title string
    is_completed boolean
    created_at timestamp
    updated_at timestamp
  }
```

## 考慮したポイント

### ページネーションの実装

このアプリケーションでは、一画面に全ての Todo を表示すると情報が多くなり、見づらくなる可能性があるため、ページネーションを実装しました。5 件毎の Todo を表示することで、ユーザーが一度に見る情報量を制限し、画面をスッキリさせています。

### 検索機能の追加

Todo の数が増えてくると特定の Todo を探すのが難しくなります。そこで、ユーザーが特定の文字列で Todo を検索できるように機能を追加しました。これにより、ユーザーは特定の Todo を簡単に見つけることができます。

### ローディング状態の表示

ユーザーが Todo の項目を更新するとき、通信の遅延が発生する可能性があります。そのため、各 Todo 項目は更新中かどうかを示すローディング状態を持っています。更新が進行中の場合、対応する Todo 項目の場所にはスピナーが表示されます。

## ローカル開発環境構築

1. このリポジトリをクローンします。
2. `yarn install`を実行して、必要な依存関係をインストールします。
3. `.env`ファイルをルートディレクトリに作成し下記の DB 接続用の環境変数を追加します。

```
DATABASE_URL="postgresql://postgres:password@localhost:5434/db"
```

4. `prisma/schema.prisma`内の`directUrl = env("DIRECT_URL")`はコメントアウトしておきます。(こちらは Supabase と接続する際に必要なものなので`docker-compose.yml`の PostgreSQL を使用する場合は不要です)
5. `docker compose up` で PostgreSQL を起動します。

## ローカル開発サーバーの起動

開発サーバーを起動するには、まず上記で説明済みの `docker-compose.yml` に定義されている PostgreSQL を起動します。そのためには`docker compose up`を実行します。その後、`yarn dev`を実行します。デフォルトでは`localhost:3000`でアプリケーションにアクセスできます。また`npx prisma studio`で Prisma studio というデータベースを操作するための GUI(`localhost:5555`)を起動することができます。
