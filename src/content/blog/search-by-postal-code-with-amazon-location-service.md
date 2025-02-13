---
title: Amazon Location Serviceで郵便番号から住所検索をする
pubDate: "2022-03-08T23:30:00+09:00"
description: Amazon Location Serviceで郵便番号から住所検索をする
---

住所を入力するフォームでよくある、郵便番号を入力すると住所が補完される例の機能（以降は、郵便番号検索とします）を実装する必要があったの Amazon Location Service が使えないか調べてみました。

郵便番号検索の SaaS として、[^1]様々なサービスがありますが、AWS で環境を揃えたいなどの理由もあり Amazon Location Service に白羽の矢が立ちました。

[^1]: [Google Maps の Geocofing API](https://developers.google.com/maps/documentation/geocoding/requests-geocoding)や[ケンオール](https://kenall.jp/features/postalcode)などがあります。

Amazon Location Service での郵便番号検索には[Geocoding](https://docs.aws.amazon.com/location/latest/developerguide/search-place-index-geocoding.html)の[SearchPlaceIndexForText](https://docs.aws.amazon.com/location-places/latest/APIReference/API_SearchPlaceIndexForText.html)を利用します。

## PlaceIndex の作成

まず、「場所インデックス」を作成します。次のコマンドを実行すると「場所インデックス」を作成できます。
マネージメントコンソールから作成しても大丈夫ですが、**データプロバイダーとして必ず[^2][Here](https://aws.amazon.com/jp/location/data-providers/here-technologies/)を選択してください。**

[^2]: データプロバイダーとして`Here`以外に[Esri](https://aws.amazon.com/jp/location/data-providers/esri/)もありますが、`Esri`では日本の郵便番号での検索はできませんでした(どの郵便番号でも結果が 0 件でした)。

```sh
$ aws location create-place-index
    --data-source Here \
    --description "PostalCode Index" \
    --index-name PostalCodePlaceIndex
```

## SearchPlaceIndexForText で検索

「場所インデックス」が作成できたら、早速郵便番号検索をしてみます。今回は AWS CLI を使って検索してみました。

検索は次のコマンドを実行して行います。郵便番号は`--text`オプションで指定します。
検索結果には日本だけを含むようにしたいので`--filter-countries JPN`オプションも指定しています。

```sh
$ aws location search-place-index-for-text \
  --index-name PostalCodePlaceIndex \
  --language ja \
  --filter-countries JPN \
  --text <postalCode>
```

### 市区町村パターン

最初に、郵便番号`1010041`(`東京都千代田区神田須田町`)を検索してみます

結果は、次のように`Results.Place`に`東京都千代田区神田須田町`が含まれています。
レスポンス内の`Place`オブジェクトの各属性が住所フィールドの補完に利用できそうです。

それぞれの見ていくと、以下のような構成になっているようです。[公式ドキュメントの Place](https://docs.aws.amazon.com/location-places/latest/APIReference/API_Place.html)の記述と照らし合わせても一致します。

- Label: 郵便番号を含む住所全体
- Municipality: 市区町村
- PostalCode: 郵便番号
- Region: 都道府県

ただ、`神田須田町`だけを持った属性はなさそうです。レスポンスの値を住所フィールドの補完に利用する際に`神田須田町`（所謂、町域名）の部分は`Label`から抽出する必要がありそうです。

```json
{
  "Results": [
    {
      "Place": {
        "Country": "JPN",
        "Geometry": {
          "Point": [139.77105, 35.69593]
        },
        "Interpolated": false,
        "Label": "〒101-0041 東京都千代田区神田須田町",
        "Municipality": "千代田区",
        "PostalCode": "101-0041",
        "Region": "東京都",
        "TimeZone": {
          "Name": "Asia/Tokyo",
          "Offset": 32400
        }
      }
    }
  ],
  "Summary": {
    "DataSource": "Here",
    "FilterCountries": ["JPN"],
    "Language": "ja",
    "MaxResults": 50,
    "ResultBBox": [139.77105, 35.69593, 139.77105, 35.69593],
    "Text": "1010041"
  }
}
```

### 郡パターン

`○○郡xx町`というような住所のパターンの検索です。ここでは郵便番号`1901211`(`東京都西多摩郡瑞穂町石畑`)を検索してみます。
コマンドは`--text`オプションに指定する郵便番号以外は直前のものと同じになるので、以降の記載は省略します。

結果は次の通りです。先程と違い`SubRegion`という属性が存在しています。値は`西多摩郡`です。`SubRegion`が`○○郡`の部分に該当するようです。

```json
{
  "Results": [
    {
      "Place": {
        "Country": "JPN",
        "Geometry": {
          "Point": [139.35873, 35.76639]
        },
        "Interpolated": false,
        "Label": "〒190-1211 東京都西多摩郡瑞穂町石畑",
        "Municipality": "瑞穂町",
        "PostalCode": "190-1211",
        "Region": "東京都",
        "SubRegion": "西多摩郡",
        "TimeZone": {
          "Name": "Asia/Tokyo",
          "Offset": 32400
        }
      }
    }
  ],
  "Summary": {
    "DataSource": "Here",
    "FilterCountries": ["JPN"],
    "Language": "ja",
    "MaxResults": 50,
    "ResultBBox": [139.35873, 35.76639, 139.35873, 35.76639],
    "Text": "1901211"
  }
}
```

### 行政区パターン

次に`札幌市中央区`のような特別区以外の区（所謂、行政区）の郵便番号`0600035`(`北海道札幌市中央区北5条東`)を検索してみます。

結果は次の通りです。`Neighborhood`という属性が存在しています。値は`中央区`です。、`Neighborhood`が行政区の部分に相当しそうです。

```json
{
  "Results": [
    {
      "Place": {
        "Country": "JPN",
        "Geometry": {
          "Point": [141.35752, 43.06827]
        },
        "Interpolated": false,
        "Label": "〒060-0035 北海道札幌市中央区北5条東",
        "Municipality": "札幌市",
        "Neighborhood": "中央区",
        "PostalCode": "060-0035",
        "Region": "北海道",
        "TimeZone": {
          "Name": "Asia/Tokyo",
          "Offset": 32400
        }
      }
    }
  ],
  "Summary": {
    "DataSource": "Here",
    "FilterCountries": ["JPN"],
    "Language": "ja",
    "MaxResults": 50,
    "ResultBBox": [141.35752, 43.06827, 141.35752, 43.06827],
    "Text": "0600035"
  }
}
```

ここまでの結果から、`Place`の属性と日本の住所の構成要素は以下のようマッピングできそうです。

- PostalCode: 郵便番号
- Region: 都道府県
- SubRegion: 郡
- Municipality: 市区町村
- Neighborhood: 行政区(特別区除く)
- Label: 郵便番号を含む住所全体

また、それぞれの属性値を結合するような場合は、住所文字列をとしても上記の順番でよさそうです。

## その他のパターン

さらに、もう少し別のパターンも検索してみます。

個別の郵便番号が設定されている高層ビルのパターンはどうでしょう。郵便番号`1006001`(`東京都千代田区霞が関霞が関ビル（１階）`)を検索してみます。
結果は次の通りです。結果は 0 件です。すべての検証したわけではありませんが高層ビルなどの建物の階毎に割り振られた郵便番号では検索できないようです。
この他にも、`1001701`(`東京都青ヶ島村`)などいくつかの郵便番号で検索結果が 0 件になりました。他の離島[^3]では検索できる郵便番号もあるので、離島だから必ず検索できないわけではないようです。検索できるかできないかはデータプロバイダーが提供するデータ次第になりそうです。

[^3]: 離島でも`9980281`(`山形県酒田市飛島`)は検索結果を取得できました。

```json
{
  "Results": [],
  "Summary": {
    "DataSource": "Here",
    "FilterCountries": ["JPN"],
    "Language": "ja",
    "MaxResults": 50,
    "Text": "1006001"
  }
}
```

## まとめ

- PlaceIndex には`Here`を使う。
- `Place`の属性と日本の住所のマッピングはこれ。
  - PostalCode: 郵便番号
  - Region: 都道府県
  - SubRegion: 郡
  - Municipality: 市区町村
  - Neighborhood: 行政区(特別区除く)
  - Label: 郵便番号を含む住所全体
- 検索できない郵便番号もある（データプロバイダーが提供するデータ次第）。

以上から、郵便番号検索に Amazon Location Service を採用するかは要件次第になると思います。
存在する郵便番号を完全に網羅しているわけではないので、その点が重要であれば少なくとも現時点では別の方法（別の SaaS、自前でデータ管理）を採用するのが良さそうです。
一方、一部検索できない郵便番号があることが許容できるのであれば、AWS 上で郵便番号検索を簡単に実装できる選択肢になると思います。データの更新はデータプロバイダーにお任せできる点も自前データ管理と比較するとメリットになりますし、Google Maps と比較しても料金は AWS がお得になりそうです。
