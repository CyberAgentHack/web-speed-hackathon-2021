# Web Speed Hackathon 2021 mini

**"Web Speed Hackathon 2021 mini" は、非常に重たい Web アプリをチューニングして、いかに高速にするかを競う競技です。**

今回のテーマは、架空の SNS サイト「CAwitter」です。
「CAwitter」のパフォーマンスを改善してください。

- デモサイト: https://web-speed-hackathon-2021.herokuapp.com/
- リーダーボード: https://github.com/CyberAgentHack/web-speed-hackathon-2021-leaderboard

[過去に開催した学生向け / 社内向け Web Speed Hackathon 2021 についてはこちら](./docs/internal/README.md)

## 参加方法

- 開催期間 | **2021/12/4 (土) – 2022/1/3 (月)**
- 参加資格 | **どなたでも自由に参加できます**

1. **レギュレーション・注意事項をよく読んで、問題なければ同意します**
   - [レギュレーション](./docs/REGULATION.md)
   - [注意事項](#注意事項)
1. **課題のソースコードを fork します**
   - https://github.com/CyberAgentHack/web-speed-hackathon-2021
1. **アプリケーションをデプロイして、URL を提出します**
   - [提出フォーム](https://github.com/CyberAgentHack/web-speed-hackathon-2021-leaderboard/issues/new/choose)
1. **自動で計測されて、リーダーボードに反映されます**
   - よければ、採点結果を **#WebSpeedHackathon** で Twitter に投稿してください
1. **開催期間中の参加記事や解説記事、大歓迎です！**
   - 他の人の解説記事や参加記事を読んで、更に高速なアプリを目指しましょう

### 以前の Web Speed Hackathon 2021 参加者のかたへ

開催形式の変更に伴い、以前の Web Speed Hackathon 2021 から、いくつかの変更点があります。

:warning: **以前の Web Speed Hackathon 2021 のコードでは参加いただけません。ご了承ください。**

<details>
<summary>主な変更点</summary>

- Node.js 、ライブラリのバージョンをアップデートしました
- GIF 画像の左下にライセンス情報が追加されました
- `prefers-reduced-motion: reduce` が有効のとき、動画を自動再生しないようにしました
- 音声の波形 SVG データから `stroke` を削除しました
- LICENSE を UNLICENSE から Mozilla Public License 2.0 に変更しました
- その他、軽微なコードの調整をしました

</details>

## 注意事項

- **GitHub issue による参加登録フローであるため、GitHub アカウント名が一般に公開されます**
- 既に学生採用イベント・社内イベントで開催している都合上、優勝賞品はありません
- 開催期間が長期間であるため、計測がうまく行かない場合の対応は、ベストエフォートになります

## 開発方法

開発に必要なドキュメントは、[./docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) を参照してください。

## API 仕様書

API 仕様書は、[./docs/API.md](./docs/API.md) (API Blueprint 形式) を参照してください。

## ライセンス

- Codes: MPL-2.0 by (c) CyberAgent
- Audio data: CC0 1.0 by https://freepd.com/
- Image data: Unsplash License by https://unsplash.com/
- Movie data: CC BY 3.0 by Blender Foundation https://peach.blender.org/
- Fonts
  - 源暎エムゴ: OFL 1.1 by おたもん http://okoneya.jp/font/

---

(c) CyberAgent
