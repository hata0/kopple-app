# 環境構築
1. 作業用のディレクトリで以下のコマンドを順番に実行します。
```shell
git clone git@github.com:saezuri510/kosen-hackathon-app.git
cd kosen-hackathon-app
npm i
```
また、Webアプリケーションを立ち上げる時は`npm run dev`を実行してください。

2. vscodeに以下の拡張機能をインストールしてください。
  - prettier
  - eslint
  - tailwind css intellisence

3. `ctrl + shift + p`でコマンドパレットを開き`open user settings`と入力し、`settings.json`を開き以下の記述を追加してください。
```json
{
  "editor.defaultFormatter": null,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[graphql]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
}
```
