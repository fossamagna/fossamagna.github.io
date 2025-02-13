---
title: Amplify CDK オーバーライドってどうなってるの？
pubDate: "2021-12-20T09:15:29+09:00"
description: Amplify CDK オーバーライドってどうなってるの？
---

この記事は [AWS Amplify Advent Calendar 2021](https://qiita.com/advent-calendar/2021/amplify) と [ESM Advent Calendar 2021](https://adventar.org/calendars/6972) の 20 日目の記事です。

Amplify CLI v7.3.0 で CDK オーバーライドの機能が提供されました。かなり熱い機能です。
Amplify の CDK オーバーライドはどうやって実装されているのかを調べたので紹介します。

## どうして CDK オーバーライドを調べたのか

[amplify-category-console-notification](https://github.com/fossamagna/amplify-category-console-notification)[^1]という amplfy プラグインを公開しているですが、
そのプラグインでも`amplify console-notification override`のように利用者が設定を上書きできる機能を提供したいというのが動機です。
そのため、CDK オーバーライドを実装するにはどうすればいいのか？を把握することを目的に実装がどうなっているのかを紹介します。
なお、この記事では[amplify cli v7.6.3](https://github.com/aws-amplify/amplify-cli/releases/tag/v7.6.3)を対象に調べています。

[^1]: [AWS Amplify Advent Calendar 2021 16 日目の記事](https://qiita.com/dyson-udonsin/items/5d2b7105736bf8a742c4)で紹介いただいたプラグインです。

## オーバーライドとは

そもそも、「Amplify CDK オーバーライドとは何か」ですが、Amplify が生成するバックエンドリソース（の一部）を CDK でカスタマイズできる機能です。今までは生成された CloudFormation テンプレートの JSON ファイルを直接編集してカスタマイズしていたのを CDK を利用してカスタマイズできるようになったというものです。
詳しくは[Amplify で生成されたバックエンドリソースを CDK でカスタマイズする新機能 「オーバーライド」のご紹介](https://aws.amazon.com/jp/blogs/news/override-amplify-generated-backend-resources-using-cdk/)という Amazon Web Services ブログの記事を読んでいただくと一通り把握できると思います。

## どうなってる？

次の 2 点がどうなっているかを調べるとサードパーティプラグインで CDK オーバーライドを提供（実装）できるのではないかと考えました。

- `amplify override` はどう実装されているか
- `amplify push` でカテゴリープラグインのどの API が呼び出されているのか(カテゴリープラグインはどの API を実装すればいいのか)

そこで、この 2 点についてどう実装されているのか見ていきます。
amplify では overide は`auth`, `storage`, `api`のカテゴリーで提供されていますが、ここでは`storage`カテゴリーに絞って探っていきたいと思います。

### `amplify category override` の実装を見る

オーバーライドを利用するにはまず次のコマンドを実行します。

```bash
$ amplify storage override
```

このコマンドを実行すると、`storage`カテゴリーのどのリソースをオーバーライドするのかユーザーに問い合わせてから、以下のコードが呼び出されます。

[amplify-category-storage/src/commands/storage/override.ts#L58-L83](https://github.com/aws-amplify/amplify-cli/blob/dacdff9136a385ca99797fffb45e810d8f378568/packages/amplify-category-storage/src/commands/storage/override.ts#L58-L83):

```ts raw_url=https://raw.githubusercontent.com/aws-amplify/amplify-cli/dacdff9136a385ca99797fffb45e810d8f378568/packages/amplify-category-storage/src/commands/storage/override.ts#L58-L83

```

何をしているのか確認してみます。
ストレージの種類が DynamoDB か S3 かで分岐していますが、どちらも同じような処理を行っているので、DynamoDB の方を見てみます。

やっていることは次の処理です。

1. マイグレーションが必要かをチェックします。
2. ファイルがなければユーザに問い合わせた後にマイグレーションを実行します。
3. マイグレーションで生成したファイルをもとに CDK スタックから Cfn テンプレートを作成します。
4. 最後に`generateOverrideSkeleton`関数を実行します。

マイグレーションの必要性のチェック、マイグレーションの実行は`DynamoDBInputState`[^2]というクラスに実装されています。
マイグレーションが必要かのチェックですが、`cliInputFileExists`関数がその役割です。`cli-input.json`[^3]ファイルの有無でマイグレーションが必要であるか判断しています。

[amplify-category-storage/src/provider-utils/awscloudformation/service-walkthroughs/dynamoDB-input-state.ts#L47-L49](https://github.com/aws-amplify/amplify-cli/blob/dacdff9136a385ca99797fffb45e810d8f378568/packages/amplify-category-storage/src/provider-utils/awscloudformation/service-walkthroughs/dynamoDB-input-state.ts#L47-L49):

```ts raw_url=https://raw.githubusercontent.com/aws-amplify/amplify-cli/dacdff9136a385ca99797fffb45e810d8f378568/packages/amplify-category-storage/src/provider-utils/awscloudformation/service-walkthroughs/dynamoDB-input-state.ts#L47-L49

```

[^2]:
    この`DynamoDBInputState`は何かのインタフェースを実装してはいませんが、`/* Need to move this logic to a base class */` というコメントが書かれており、
    `auth`カテゴリのソースを見ると同じような役割の`AuthInputState`クラスが`CategoryInputState`クラスを継承しています。
    マイグレーションを実装する場合は、`CategoryInputState`クラスを継承して実装するのが良さそうです。

[^3]: `cli-input.json`について公式ドキュメントには、まだ記載はないようです。このファイルにはユーザーから入力された値を保存しておき、CDK のコードをビルドする際に利用するためのものです。

マイグレーションは`migrate`関数に実装されています。マイグレーションでは既存の`parameters.json`,Cfn テンプレートファイル,`storage-params.json`を読み込んで`cli-input.json`を作成します。
そして、既存のファイルを削除します。

[amplify-category-storage/src/provider-utils/awscloudformation/service-walkthroughs/dynamoDB-input-state.ts#L71-L161](https://github.com/aws-amplify/amplify-cli/blob/dacdff9136a385ca99797fffb45e810d8f378568/packages/amplify-category-storage/src/provider-utils/awscloudformation/service-walkthroughs/dynamoDB-input-state.ts#L71-L161):

```ts raw_url=https://raw.githubusercontent.com/aws-amplify/amplify-cli/dacdff9136a385ca99797fffb45e810d8f378568/packages/amplify-category-storage/src/provider-utils/awscloudformation/service-walkthroughs/dynamoDB-input-state.ts#L71-L161

```

マイグレーションを実行すると次に、`DDBStackTransform.transform()`関数を呼び出しています。
`transform()`関数では、`cli-input.json`から Cfn テンプレートファイル(`cloudformation.json`)とパラメータファイル(`parameters.json`)を生成しています。
`applyOverrides`関数を呼び出してユーザーがオーバーライドした内容(`override.ts`)をスタックに適用する処理も実行されます。
ただし、この時点では`override.ts`はまだ存在していないので何もオーバーライドされるものはありません。

[amplify-category-storage/src/provider-utils/awscloudformation/cdk-stack-builder/s3-stack-transform.ts#L60-L70](https://github.com/aws-amplify/amplify-cli/blob/b3ca83b9bec986f0fd525d46738b277eb93e4384/packages/amplify-category-storage/src/provider-utils/awscloudformation/cdk-stack-builder/s3-stack-transform.ts#L60-L70):

```ts raw_url=https://raw.githubusercontent.com/aws-amplify/amplify-cli/b3ca83b9bec986f0fd525d46738b277eb93e4384/packages/amplify-category-storage/src/provider-utils/awscloudformation/cdk-stack-builder/s3-stack-transform.ts#L60-L70

```

最後に、`generateOverrideSkeleton`関数の呼び出しです。`generateOverrideSkeleton`関数はオーバーライドを利用する場合に必要な`tsconfig.json`や`override.ts`ファイルの生成してくれる関数です。
プラグインでオーバーライドを実装する場合も、この関数を適切な引数で呼び出せば良さそうです。

ここまで見てきた内容を踏まえると `amplify overide <category>` コマンドは実装できそうです。

### `amplify push` の実装を見る

次に、`amplify push` を実行したときに CDK オーバーライド（`override.ts`）のコードがどのように反映されてデプロイされるのか見てみます。
`amplify push`を実行すると `amplify-cli/src/extensions/amplify-helpers/push-resources.ts` の `pushResource`関数が呼び出されます。

#### `override.ts`のビルドと Cfn テンプレートファイル生成

`pushResource`関数の中に以下のコードがあり、`context.amplify.executeProviderUtils(context, 'awscloudformation', 'buildOverrides', {...})`を呼び出しています。
ここで Cfn テンプレートが生成されているようです。

[amplify-cli/src/extensions/amplify-helpers/push-resources.ts#L57-L63](https://github.com/aws-amplify/amplify-cli/blob/b3ca83b9bec986f0fd525d46738b277eb93e4384/packages/amplify-cli/src/extensions/amplify-helpers/push-resources.ts#L57-L63):

```ts raw_url=https://raw.githubusercontent.com/aws-amplify/amplify-cli/b3ca83b9bec986f0fd525d46738b277eb93e4384/packages/amplify-cli/src/extensions/amplify-helpers/push-resources.ts#L57-L63

```

`context.amplify.executeProviderUtils(context, 'awscloudformation', 'buildOverrides', {...})`を呼び出すと以下に示す関数が順次呼び出されていきます。

1. [amplify-provider-awscloudformation/src/utility-functions.js#L66-L75](https://github.com/aws-amplify/amplify-cli/blob/b3ca83b9bec986f0fd525d46738b277eb93e4384/packages/amplify-provider-awscloudformation/src/utility-functions.js#L66-L75):

```ts raw_url=https://raw.githubusercontent.com/aws-amplify/amplify-cli/b3ca83b9bec986f0fd525d46738b277eb93e4384/packages/amplify-provider-awscloudformation/src/utility-functions.js#L66-L75

```

ここでリソース毎に`transformResourceWithOverrides`関数を呼び出しています。

2. [amplify-provider-awscloudformation/src/override-manager/transform-resource.ts#L16-L66](https://github.com/aws-amplify/amplify-cli/blob/b3ca83b9bec986f0fd525d46738b277eb93e4384/packages/amplify-provider-awscloudformation/src/override-manager/transform-resource.ts#L16-L66):

```ts raw_url=https://raw.githubusercontent.com/aws-amplify/amplify-cli/b3ca83b9bec986f0fd525d46738b277eb93e4384/packages/amplify-provider-awscloudformation/src/override-manager/transform-resource.ts#L16-L66

```

`transformResourceWithOverrides`関数では指定されたリソースのカテゴリープラグインが実装する`transformCategoryStack`関数を呼び出しています。

3. [amplify-category-storage/src/index.ts#L115-L124](https://github.com/aws-amplify/amplify-cli/blob/b3ca83b9bec986f0fd525d46738b277eb93e4384/packages/amplify-category-storage/src/index.ts#L115-L124):

```ts raw_url=https://raw.githubusercontent.com/aws-amplify/amplify-cli/b3ca83b9bec986f0fd525d46738b277eb93e4384/packages/amplify-category-storage/src/index.ts#L115-L124

```

`amplify-category-storage`の`transformCategoryStack`関数は DynamoDB のリソースであれば`DDBStackTransform.transform()`関数を呼び出しています。
この`transform`関数はマイグレーションの処理でも呼び出されていましたね。この関数で呼びだされる`applyOverrides`関数で`override.ts`の内容でスタックを上書きしています。次で詳細を見てみましょう。

4. [amplify-category-storage/src/provider-utils/awscloudformation/cdk-stack-builder/ddb-stack-transform.ts#L173-L215](https://github.com/aws-amplify/amplify-cli/blob/b3ca83b9bec986f0fd525d46738b277eb93e4384/packages/amplify-category-storage/src/provider-utils/awscloudformation/cdk-stack-builder/ddb-stack-transform.ts#L173-L215):

```ts raw_url=https://raw.githubusercontent.com/aws-amplify/amplify-cli/b3ca83b9bec986f0fd525d46738b277eb93e4384/packages/amplify-category-storage/src/provider-utils/awscloudformation/cdk-stack-builder/ddb-stack-transform.ts#L173-L215

```

`buildOverrideDir`関数で`override.ts`をビルドして`override.js`を出力します。ビルドされたら`new vm.NodeVM({...})`で作成した Node.js のサンドボックス環境内で`override`関数を呼び出してユーザーが定義したオーバーライドの内容をスタックに反映します。

5. [amplify-category-storage/src/provider-utils/awscloudformation/cdk-stack-builder/ddb-stack-transform.ts#L217-L239](https://github.com/aws-amplify/amplify-cli/blob/b3ca83b9bec986f0fd525d46738b277eb93e4384/packages/amplify-category-storage/src/provider-utils/awscloudformation/cdk-stack-builder/ddb-stack-transform.ts#L217-L239):

```ts raw_url=https://raw.githubusercontent.com/aws-amplify/amplify-cli/b3ca83b9bec986f0fd525d46738b277eb93e4384/packages/amplify-category-storage/src/provider-utils/awscloudformation/cdk-stack-builder/ddb-stack-transform.ts#L217-L239

```

`DDBStackTransform.transform()`関数は`applyOverrides`関数の後に`saveBuildFiles`関数を呼び出して、オーバーライドの内容を反映したスタックから Cfn のテンプレートをファイル出力します。同時に`parameters.json`も出力します。

ここまでで、`amplify push`を実行したときに`override.ts`がどうビルド・反映されて Cfn テンプレートが生成されるのか把握できました。
プラグインでこの仕組みを実装する場合、問題になる箇所があります。それは、以下のカテゴリープラグインが実装する`transformCategoryStack`関数を取得する部分です。

[amplify-provider-awscloudformation/src/override-manager/transform-resource.ts#L22](https://github.com/aws-amplify/amplify-cli/blob/b3ca83b9bec986f0fd525d46738b277eb93e4384/packages/amplify-provider-awscloudformation/src/override-manager/transform-resource.ts#L22):

```ts raw_url=https://raw.githubusercontent.com/aws-amplify/amplify-cli/b3ca83b9bec986f0fd525d46738b277eb93e4384/packages/amplify-provider-awscloudformation/src/override-manager/transform-resource.ts#L22

```

インポートするプラグインが`@aws-amplify/amplify-category-`で始まるものに限定されています。つまり、公式プラグインのみを対象にしています。
`transformCategoryStack`関数を実装してもプラグイン側からその関数を amplify-cli 側に提供できないということです。😢

### 実装に向けた活動

このままでは、サードパーティのプラグインで Amplify CLI が提供している CDK オーバーライドと同じ仕組みに乗っかって機能提供するのは難しそうなのでの GitHub の amplify-cli リポジトリで Issue を出しました。

https://github.com/aws-amplify/amplify-cli/issues/9226

今後は、サードパーティのプラグインで CDK オーバーライドが実装できるように、この Issue への Pull Request も出していきたいと思います。
