# What is this?

HypieはTypeScriptを使った、Discord botの作成を手助けするテンプレートです。
構造はかなりKlasaに似ています。

## TypeORMを使用したデータベースを設計できる

TypeORMとTypeScriptの相性は抜群です。そこでv12の機能を使いうまく結合してみました。
ユーザー、メンバー、サーバーで設定を分けられます。

- ユーザー、メンバー、サーバーの3つで分けられています。
- TypeORMがサポートしているデータベースならどれでも使える。
- Active Record
- 世代管理もできる。

### 例

```ts
const userSettings = await message.author.getSettings()

userSettings.point += 1

await userSettings.save()
```

## やりやすいコマンド設計

KlasaやCommandoなどのフレームワークで、コマンドの引数を文字列やオブジェクトで書かされますよね。あれってめんどくさくないですか？
誤字で一々修正するのも嫌ですよね。なのでHypieではそれを解決し、**デコレーター**を使った設計が可能になるようにしてみました。
さらにはメタデータを元に、**コマンドの使用法まで作ってくれます！**

## 強い多言語サポート

デフォルトでは日本が選択されています。

注意: **言語ファイルもTSファイルで書きます。Crowdinなどのツールは使えません。**
