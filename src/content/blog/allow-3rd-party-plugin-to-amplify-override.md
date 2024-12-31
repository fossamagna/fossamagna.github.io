---
title: サードパーティプラグインでAmplify CDK オーバーライドが可能になりました
pubDate: "2022-06-05T09:00:07+09:00"
description: "サードパーティプラグインでAmplify CDK オーバーライドが可能になりました"
---

以前、[Amplify CDK オーバーライドってどうなってるの？](../anatomy-of-amplify-override/)という記事で Amplify CDK オーバーライドがどう実装されているのか書きました。
その時、サードパーティプラグインがオーバーライドを実装できるようになっていないこともわかりました。
そして amplify-cli のリポジトリでサードパーティプラグインがオーバーライドを実装できるようにする機能リクエストの Issue も出しました。

https://github.com/aws-amplify/amplify-cli/issues/9226

後日、Pull Request を出しましたが、最近やっとそれがマージされ[amplify-cli@8.4.0](https://github.com/aws-amplify/amplify-cli/releases/tag/v8.4.0)としてリリースされたので概要を書きたいと思います。
Pull Request を作成してからマージまで 5 ヶ月くらいかかりました。。。

https://github.com/aws-amplify/amplify-cli/pull/9601

## 何が変わったか？

[以前の記事](../anatomy-of-amplify-override/)でも触れましたが、
Amplify CDK オーバーライドを使うと`override.ts`というファイルで CDK の API を利用して Amplify(の対象のカテゴリー)が提要する機能をオーバーライドできます。
`override.ts`に記述した内容は`amplify push`を実行するとその内容が最終的に Cloud Formation のテンプレートとその入力パラメーターとなる`parameters.jons`に変換されてデプロイされます。

以前は`amplify push`の時に実行される Cloud Formation のテンプレートの生成の処理が`@aws-amplify`のパッケージスコープに限定されていましたが、
今回の Pull Request がマージされてからは、`amplify push`のライフサイクルで全てのカテゴリープラグインの`transformCategoryStack`関数を呼び出してもらえるようになりました。
この関数を実装すれば公式プラグイン(`amplify-category-api`など)と同じ CDK オーバーライドの機能を提供できるようになりました。

ざっくりまとめると、以下のようになります。

### amplify-cli から提供されるもの

- `transformCategoryStack`関数を実装して amplify-cli が提供するライフサイクルをフックできる
- `cli-inputs.json`のバリデーション

### amplify-cli から提供されないもの(プラグインが実装するもの)

- `override.ts`のトランスパイル(`override.js`の生成)
- `override.js`の実行(Cfn テンプレートの生成)

## まとめ

サードパーティプラグインでも CDK オーバーライドの機能が提供できるようになりました。
実際にどう実装すると良いのかはまた別記事で紹介したいと思います。
