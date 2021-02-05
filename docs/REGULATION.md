## レギュレーション

### 採点方法

1. [Lighthouse](https://github.com/GoogleChrome/lighthouse) を用いて、次の計 6 ページを検査します
   - ホーム
   - 投稿詳細ページ x 3
   - ユーザー詳細ページ
   - 利用規約ページ
1. 各ページごと [Lighthouse v8 Performance Scoring](https://web.dev/performance-scoring/#lighthouse-8) に基づき、次の総和をページのスコアとします
   - Performance Score (0-100 点)
   - First Contentful Paint の相対スコア × 2 (0-2 点)
   - Speed Index の相対スコア × 2 (0-2 点)
   - Largest Contentful Paint の相対スコア × 5 (0-5 点)
   - Time To Interactive の相対スコア × 2 (0-2 点)
   - Total Blocking Time の相対スコア × 6 (0-6 点)
   - Cumulative Layout Shift の相対スコア × 3 (0-3 点)
1. 各ページのスコアを合算し、得点とします
1. 後述するレギュレーションに違反している場合、順位対象外とします

### レギュレーション

- **課題のレポジトリにあるコード・その他ファイルは、すべて変更してよい**
  - API が返却する内容に新しい項目を追加してよい
- **外部のサービス（SaaS など）を無料の範囲で自由に利用してよい**
  - 無料で使えるサービスは https://free-for.dev/ などで調べられます
  - 有料のサービスを使った場合の経費などは、自己負担となります
- **Google Chrome 最新版において、著しい機能落ちやデザイン差異を発生させてはならない**
- **競技開催中は、アプリケーションにアクセスできる状態であること**
  - 任意のタイミングで、レギュレーションチェックをする場合があります
  - レギュレーションチェックのとき、アプリケーションにアクセスできない場合は、順位対象外になる可能性があります

### チェック項目

- API `POST /api/v1/initialize` にリクエストを送ると、データベースの内容が初期値にリセットされること
- 次の計 6 ページの Visual Regression Test で著しい差分がないこと
  - ホーム
  - 投稿詳細ページ x 3
  - ユーザー詳細ページ
  - 利用規約ページ
- 著しい機能落ちがないこと
  - 具体的な確認項目は [チェックリスト](./CHECKLIST.md) を確認すること
