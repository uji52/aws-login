# aws-login
## 前提

* WSLにAWS Credentialを設定している人
* Async/Awaitの使えるNodejsが走る
* jqコマンドがインストールされている

## 動作確認環境

* Windows 10 WSL2 CentOS 7
* Nodejs 10.20(12.18.3を使うとnpm install時にエラー有り)
* AWS SDK

## 注意

作業工程でIAM Role, Policyを1つ作成します。

## 使い方

まずはセットアップを行い、自身のAWSアカウントに必要なIAM Role, Policyを作成します。

```
$ npm run setup
Please input aws account id (e.x. 520052005200
> 123456789012
```

アクセス用のサービスを起動します。

```
$ npm start
Server running at http://localhost:5201
```

AWS Management Consoleでアクセスしたいブラウザで表示されたURLにアクセスします。
http://localhost:5201
