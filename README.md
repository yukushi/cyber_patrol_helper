![](https://img.shields.io/badge/ver-0.0.4-brightgreen.svg?longCache=true&style=flat-square)
![](https://img.shields.io/badge/JavaScript-ES6-yellow.svg?longCache=true&style=flat-square)
![](https://img.shields.io/badge/web%20browser-Google%20Chrome-blue.svg?longCache=true&style=flat-square)

# サイバーパトロール通報支援
## 概要
ツイッターにおけるサイバーパトロールを支援します  
通報するまでのURLコピーや貼り付けが不要になります

## 機能
- タイムライン上もしくは個別ツイートの下部に通報ボタンを設置
- 通報ボタンをクリックすると通報ページが開き，URLとユーザ名を自動で入力
- 通報履歴の閲覧とCSVのエクスポートが可能（ver0.0.2）
- 通報時の「任意」と「メールアドレス」の欄を設定，自動入力可能（ver0.0.3）

## ビルド
### 環境
- Google Chrome ver65.0.3325.181(Official Build) (64 ビット)

## 導入方法
1. ファイルを解凍
1. 「chrome://extensions/」へアクセス
1. 「パッケージ化されていない拡張機能を読み込む」をクリック
1. 1で解凍して出てきたフォルダを選択

## 利用方法
1. [ツイッター](https://twitter.com/)を開く
1. 問題のツイートを探す
1. ツイート下部の★マークを押下する
1. 通報ページが開く*  

## おまけ
[tweetStatusChecker.py](https://gist.github.com/yukushi/ae98f33848894661a549bbeb6644eb87)
を使って生成したCSVファイルを読み込むと，自動でツイートの状態（凍結済み，鍵アカウント化など）を読み取り，その情報を書き込んだ状態で新たなファイルを生成します．