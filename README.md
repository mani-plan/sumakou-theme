# sumakou-theme
WordPress theme for sumakou.jp.

Google AnalyticsのID、Google Maps APIのキーは
wp-config.php に定義しています。

```
define('GTAG_ID', 'G-XXXXXXXXXX');
define('GMAP_API_KEY', 'XXXXXXXXXX');
```

## htmlフォルダについて
ブラウザでデザインを確認するための下地です。
公開サイトでは使いません。
PHPのテンプレートファイルとは css, images, js の階層が異なります。