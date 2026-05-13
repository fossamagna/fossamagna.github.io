---
title: TanStack Start を Amplify Hosting にデプロイする
pubDate: "2026-05-13T09:00:00+09:00"
description: TanStack Start アプリを AWS Amplify Hosting にデプロイする方法と、AppSync や S3 など認証が必要な AWS API を SSR で呼び出すためのアダプターを紹介します。
---

[TanStack Start](https://tanstack.com/start) は TanStack Router をベースにしたフルスタック React フレームワークです。
本記事では TanStack Start で作ったアプリを AWS Amplify Hosting にデプロイする方法と、サーバーサイドから AppSync・S3 などの AWS サービスを認証付きで呼び出すためのアダプターを紹介します。

## Nitro + aws_amplify プリセットで基本的なホスティング

TanStack Start は [Nitro](https://nitro.build/) をサーバーエンジンとして使います。
Nitro には `aws_amplify` プリセットが組み込まれており、**AWS API の呼び出しを含まないシンプルなアプリ**であれば追加のアダプターなしで Amplify Hosting へデプロイできます。

`vite.config.ts` で以下のように設定します。

```ts
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    nitro({ config: { preset: "aws_amplify", awsAmplify: { runtime: "nodejs24.x" } } }),
    tanstackStart(),
    viteReact(),
  ],
});
```

ビルド後は `.amplify-hosting` ディレクトリに成果物が出力されるので、`amplify.yml` でそのディレクトリを指定します。

```yaml
version: 1
frontend:
  preBuild:
    commands:
      - npm install
  build:
    commands:
      - npm run build
  artifacts:
    baseDirectory: .amplify-hosting
```

## 認証が必要な AWS API 呼び出しにはアダプターが必要

AppSync（Amplify Data）や S3（Amplify Storage）を **サーバーサイドで認証付きで呼び出す** 場合、Amplify の SSR サポートを有効にする必要があります。

Amplify JS の SSR サポートは Next.js・Nuxt 向けのアダプターが公式で提供されていますが、TanStack Start 向けは提供されていませんでした。
そこで TanStack Start 向けのアダプターを作成し、npm パッケージとして公開しました。

- npm: [amplify-adapter-tanstack-start](https://www.npmjs.com/package/amplify-adapter-tanstack-start)
- GitHub: [fossamagna/tanstack-start-amplify](https://github.com/fossamagna/tanstack-start-amplify)

## amplify-adapter-tanstack-start の使い方

### インストール

```sh
npm add aws-amplify amplify-adapter-tanstack-start
```

### サーバーサイド用の設定

`src/lib/amplifyServerUtils.ts` を作成し、`createServerRunner` で `runWithAmplifyServerContext` を初期化します。

```ts
import { createServerRunner } from "amplify-adapter-tanstack-start";
import outputs from "../../amplify_outputs.json";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs,
});
```

### サーバーサイド用の Data クライアント生成

`src/lib/amplify-ssr-client.ts` を作成し、SSR 向けの Data クライアントを用意します。

```ts
import type { Schema } from "../../amplify/data/resource";
import { parseAmplifyConfig } from "aws-amplify/utils";
import { generateClient } from "aws-amplify/api/server";
import config from "../../amplify_outputs.json";

const amplifyConfig = parseAmplifyConfig(config);
export const client = generateClient<Schema>({
  config: amplifyConfig,
});
```

### クライアントサイド用の設定

ルートコンポーネント（`src/routes/__root.tsx` 等）で `Amplify.configure` を呼び出します。
**`ssr: true` が必須**です。これにより認証トークンがブラウザの Cookie に保存され、サーバーへのリクエスト時に Cookie が自動的に送信されます。

```tsx
import { Amplify } from "aws-amplify";
import config from "../../amplify_outputs.json";

Amplify.configure(config, { ssr: true });
```

### サーバー関数から Amplify API を呼び出す

TanStack Start では、`createServerFn` で作成したサーバー関数の中でのみサーバーサイドの Amplify API 呼び出しが可能です。
`runWithAmplifyServerContext` の `operation` に処理を渡すと、リクエストスコープの認証コンテキストが自動的に管理されます。

```ts
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { runWithAmplifyServerContext } from "~/lib/amplifyServerUtils";
import { client } from "~/lib/amplify-ssr-client";

const fetchTodos = createServerFn({ method: "GET" }).handler(async () => {
  const { data: todos, errors } = await runWithAmplifyServerContext({
    operation: (contextSpec) => client.models.Todo.list(contextSpec),
  });
  return {
    todos: todos ?? [],
    error: errors?.map((e) => e.message).join(", "),
  };
});

export const Route = createFileRoute("/")({
  loader: () => fetchTodos(),
  component: Home,
});

function Home() {
  const { todos } = Route.useLoaderData();
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.content}</li>
      ))}
    </ul>
  );
}
```

## サンプルアプリ（Todo App）

リポジトリの `examples/todo-app` に認証付きの Todo アプリのサンプルが含まれています。

- Amplify Auth（Cognito）によるサインイン・サインアウト
- Amplify Data（AppSync）を使った Todo の CRUD
- 未ログイン時はログインページへリダイレクトする保護ルート

実際に動かして確認したい場合は、このサンプルを参考にしてください。

## まとめ

| ケース | 必要なもの |
|---|---|
| 静的サイトや単純な SSR | Nitro `aws_amplify` プリセットのみ |
| AppSync / S3 等を SSR で認証付き呼び出し | `amplify-adapter-tanstack-start` が追加で必要 |

TanStack Start と Amplify の組み合わせに興味がある方は、ぜひ [amplify-adapter-tanstack-start](https://www.npmjs.com/package/amplify-adapter-tanstack-start) を試してみてください。

## フィードバックをお待ちしています

実際に使ってみた感想・不具合・改善要望などは [GitHub の Issue](https://github.com/fossamagna/tanstack-start-amplify/issues) でお知らせください。
また、役に立ったと思ったら ⭐ をつけてもらえると励みになります。
