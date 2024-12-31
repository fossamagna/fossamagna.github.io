---
title: Introduce Amplify Flutter DataStore Extension
pubDate: "2023-12-06T09:00:00+09:00"
description: Introduce Amplify Flutter DataStore Extension
---

この記事は [AWS Amplify と AWS× フロントエンド #AWSAmplifyJP Advent Calendar 2023](https://qiita.com/advent-calendar/2023/amplify)、[AWS Community Builders Advent Calendar 2023](https://qiita.com/advent-calendar/2023/aws-community-builders) の 6 日目の記事です。

最近、Amplify & Flutter でモバイルアプリ開発をしています。
[Amplify DataStore](https://docs.amplify.aws/flutter/build-a-backend/more-features/datastore/) を使っているのですが、Amplify DataStore ってもう少し使いやすい API があるといいなと思っていました。

例えば、次のような `Todo` モデルを定義して、ID 指定で単一のレコードを取得する場合、

```graphql
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```

DataStore の API では以下のように書きます。

```dart
final id = "080f33bf-0362-4c7f-9dfa-de64fc231dca";
final todo = await Amplify.DataStore.query(
  Todo.classType,
  where: Todo.MODEL_IDENTIFIER.eq(TodoModelIdentifier(id: id)),
)
.then((list) => list.single);
```

ID 指定でレコードを 1 件取得するのにはちょっと、コード量が多いなと思います。
ID を指定しているので一意に決まるはずですが、DataStore では単一レコードを取得する API 自体がないので `query` メソッドで条件にあうレコードをリストで取得してから `list.single` のようにしてリストから単一レコードに変換が必要です。

希望としては、以下のように `getTodo` のようなメソッドがあると便利だなと思います。

```dart
final id = "080f33bf-0362-4c7f-9dfa-de64fc231dca";
final todo = await Amplify.DataStore.getTodo(id);
```

一覧画面でリストで表示して、ユーザーの選択に応じてその 1 件を詳細画面で表示するようなケースなどの詳細画面では ID 指定で取得するユースケースはよくあると思います。

そこで、こういったメソッドを生成する [amplify-flutter-datastore-extension](https://github.com/fossamagna/amplify-flutter-datastore-extension) という Amplify プラグインを作成しました。

Amplify プラグインなので、以下のように npm でインストールして使います。

```sh
npm install -g amplify-flutter-datastore-extension
amplify plugin add $(npm root -g)/amplify-flutter-datastore-extension
```

インストールしたら、いつものように通常の Amplify DataStore のモデルコードの生成を実行するだけです。

```sh
amplify codegen models
```

そうすると`DataStoreExtension.dart`というファイルを生成します。
ファイルは、Amplify.DataStore の extension になっています。

例えば、最初の Todo モデルの場合は以下のような内容でファイルが生成されます。

```dart
import 'ModelProvider.dart';
import 'package:amplify_core/amplify_core.dart' as amplify_core;

/** This is an auto generated extension representing the Todo type in your schema. */
extension TodoExtension on amplify_core.DataStoreCategory {
  Future<Todo> getTodo(String id) {
    return query(
      Todo.classType,
      where: Todo.MODEL_IDENTIFIER.eq(TodoModelIdentifier(id: id)),
    )
    .then((list) => list.single);
  }

  Future<Todo?> getTodoOrNull(String id) {
    return query(
      Todo.classType,
      where: Todo.MODEL_IDENTIFIER.eq(TodoModelIdentifier(id: id)),
    )
    .then((list) => list.singleOrNull);
  }
}
```

ファイルが生成されたら、以下のような呼び出しが可能になります。

```dart
final id = "080f33bf-0362-4c7f-9dfa-de64fc231dca";
final todo = await Amplify.DataStore.getTodo(id);
```

コード量も減ってスッキリしたと思います。Flutter で Amplify DataStore を使っている方はぜひ利用してもらいたいと思います。Issue や GitHub スターなどフィードバックをいただけると励みになります。
