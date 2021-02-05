## 開発方法

### 推奨環境

- Node.js v16 以上
- yarn v1

### コマンド

最低限のコマンドだけ記載します。
それ以外については、各フォルダの `package.json` を参照してください。

- **依存パッケージのインストール**

  ```bash
  yarn install
  ```

- **ビルド**

  ```bash
  yarn build
  ```

- **サーバーの起動**

  ```bash
  yarn start
  ```

  - 初期設定では `http://localhost:3000` でアクセスできます

- **webpack dev server**

  ```bash
  # サーバーを起動した状態で次を実行する
  yarn workspace @web-speed-hackathon-2021/client develop
  ```

  - 初期設定では `http://localhost:8080` でアクセスできます
