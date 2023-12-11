# workshop

## 使い方
- Docker Desktopを起動する
- VSCode左下の青いやつを押して，「Reopen in Container」を選ぶ(極力これでコーディングしてください)
- DBを設計しているmodels.pyを変更した場合は，Dev Containersを起動しなおすか，以下のコマンドの上2つ実行してください

URL<br>
http://127.0.0.1:3000/

DRFのURL<br>
http://127.0.0.1:8080/

## コマンド
models.pyに基づいて変更の差分からマイグレーションファイル（データベースに反映させるためのSQLを記述したファイル）を生成する
```sh
python manage.py makemigrations
```
<br>

マイグレーションファイルに基づいてテーブルの作成・変更を行う
```sh
python manage.py migrate
```
<br>

開発用のローカルサーバーを起動する
```sh
python manage.py runserver 8080
```
<br>

システム管理者（スーパーユーザー）を作成する<br>
対話型でユーザー名、メールアドレス、パスワードを入力してユーザーを作成します。システム管理者を作成することで管理サイトにログインできるようになります。
作成したユーザーの権限は、is_superuserとis_staff、is_activeがTrueで登録されます。
```sh
python manage.py createsuperuser
```