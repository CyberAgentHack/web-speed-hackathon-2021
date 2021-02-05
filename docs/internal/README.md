# Web Speed Hackathon 2021 Online

## 概要

「Web Speed Hackathon Online」はリモート参加型のハッカソンです。
予め準備してある Web アプリケーションのパフォーマンスを改善することで競い合います。

https://www.cyberagent.co.jp/careers/students/career_event/detail/id=25556

## 課題

- 架空の SNS サイト「CAwitter」のパフォーマンスを改善してください
  - https://web-speed-hackathon-2021.herokuapp.com/
- **評価対象となる環境 (URL) を作成し、提出してください**

## デプロイ

### Heroku へのデプロイ方法

1. このレポジトリを自分のレポジトリに fork します
   - https://docs.github.com/ja/github/getting-started-with-github/fork-a-repo
2. Heroku のアカウントを持っていない場合、作成します
3. 自分のレポジトリを Heroku に連携させ、デプロイを設定します
   - https://devcenter.heroku.com/ja/articles/github-integration

### Heroku の無料枠が残っていない場合

- 運営で用意している Heroku アカウントから Heroku Review App によるデプロイが使えます
- このレポジトリに向けて Pull Request を投げると自動的にデプロイが完了します
  - この方法では、デプロイ時のログを自分で確認できません
  - デプロイ失敗時には、ログを運営に問い合わせることができます
- 可能であれば、自前で別のサービスにデプロイすることをオススメします
  - ただし、Heroku 外へのデプロイについて、運営からサポートしません

### Heroku 外へのデプロイ

- 無料の範囲内であれば、Heroku 以外へデプロイしてもかまいません
  - **外部のサービスは全て無料枠の範囲内で使用してください**
  - **万が一コストが発生した場合は、全て自己負担となります**
  - ただし、Heroku 外へのデプロイについて、運営からサポートしません
  - デプロイ方法がわからないかたは Heroku で立ち上げることをオススメします

## 採点方法

**採点用ツールを https://github.com/CyberAgentHack/web-speed-hackathon-scoring-tool で公開しています。**

ローカルで、任意の URL に対して採点できます。
ただし、実際の競技上のスコアとは異なる可能性があります。
あくまでチューニングするための参考値として活用してください。

詳しくは、採点用ツールの README を参照してください。

1. [Lighthouse v6](https://github.com/GoogleChrome/lighthouse) を用いて、次の計 6 ページを検査します
   - ホーム
   - 投稿詳細ページ x 3
   - ユーザー詳細ページ
   - 利用規約ページ
2. 各ページごと [Lighthouse Performance Scoring](https://web.dev/performance-scoring/#lighthouse-6) に基づき、次の総和をページのスコアとします
   - Performance Score (0-100 点)
   - First Contentful Paint の相対スコア × 3 (0-3 点)
   - Speed Index の相対スコア × 3 (0-3 点)
   - Largest Contentful Paint の相対スコア × 5 (0-5 点)
   - Time To Interactive の相対スコア × 3 (0-3 点)
   - Total Blocking Time の相対スコア × 5 (0-5 点)
   - Cumulative Layout Shift の相対スコア × 1 (0-1 点)
3. 各ページのスコアを合算し、得点とします
4. 後述するレギュレーションに違反している場合、順位対象外とします

## レギュレーション

- このレポジトリにあるコード・その他ファイルは、すべて変更してよい
- 外部のサービス（SaaS など）を無料の範囲で自由に利用してよい
  - 無料で使えるサービスは https://free-for.dev/ などで調べられます
- API が返却する内容に新しい項目を追加してよい
- **Google Chrome 最新版において、著しい機能落ちやデザイン差異を発生させてはいけない**
  - 次の条件を満たさない場合、順位対象外とします
  - a.) ページ読み込み完了時のデザイン差異がないこと
    - フォントファミリー・文字サイズ・ウェイトに差異がない
    - 画像・動画・音声の著しい劣化がない
    - 画像・動画の解像度を表示領域より低くしない
    - ウィンドウ幅を拡縮したときの挙動に差異がない
    - その他、見た目上で著しい変化がない
  - b.) ページをスクロールしたとき、得られる情報に差異がないこと
  - c.) サービスの機能を著しく損なわないこと
    - ページの遷移が正しく行える
    - 動画の一時停止・再生を切り替えられる
    - 音声の一時停止・再生を切り替えられる
    - 音声の波形情報で再生位置が提示される
    - ユーザー登録ができる
    - 複数の画像とともに新しい投稿を作れる
      - ただし、音声・動画とともに新しい投稿を作る機能については、機能しなくても許容します
  - d.) API が返却した内容とページで表示される内容に差異がないこと
  - e.) もとのレポジトリと比較して、API が返却する内容に欠損がないこと
    - ただし、API が返却する内容に新しい項目を追加することは許可します

## 開発方法

### 環境

- Node.js (v16 以上)
- yarn

### コマンド

最低限のコマンドだけ記載します。
それ以外については、各フォルダの `package.json` を参照してください。

#### 準備

```bash
yarn install
```

#### ビルド

```bash
yarn build
```

#### サーバーの起動

標準では `http://localhost:3000` でアクセスできます。

```bash
yarn start
```

#### webpack dev server

サーバーを起動した状態で、クライアントの webpack Dev Server を起動します。

標準では `http://localhost:8080` でアクセスできます。

```bash
(cd server; yarn start)
(cd client; yarn develop)
```

## API 仕様書

API 仕様書は、[./docs/API.md](./docs/API.md) (API Blueprint 形式) を参照してください。

## ライセンス

- Codes: MPL-2.0 by (c) CyberAgent
- Audio data: CC0 1.0 by https://freepd.com/
- Image data: Unsplash License by https://unsplash.com/
- Movie data: CC BY 3.0 by Blender Foundation https://peach.blender.org/
- Fonts
  - 源暎エムゴ: OFL 1.1 by おたもん http://okoneya.jp/font/
