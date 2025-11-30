# real-chat-test

Монорепозиторий с простым приложением чата:

- `client/` — React-приложение (порт 3000)
- `server/` — Node.js + Express + Socket.IO (порт 5000)

## Локальный запуск

1. Установить зависимости (в корне — нет, отдельно для client и server):

```powershell
cd .\client
npm install
cd ..\server
npm install
```

2. Запустить сервер (в отдельном окне PowerShell):

```powershell
cd .\server
npm run start
# или в режиме разработки
npm run dev
```

3. Запустить клиент (в другом окне PowerShell):

```powershell
cd .\client
npm start
```

Клиент будет по умолчанию на `http://localhost:3000`, сервер на `http://localhost:5000`.

Если Socket.IO не подключается (404 на `/socket.io/`), убедитесь, что сервер запущен командой `node index.js` или `npm run dev` и что Socket.IO привязан к HTTP-серверу (файл `server/index.js`).

## Инициализация Git и публикация на GitHub

Если у тебя ещё нет удалённого репозитория на GitHub, создай его через веб-интерфейс (New repository) или используй `gh` (GitHub CLI).

### Вариант A — через терминал / веб-интерфейс GitHub

Открой терминал в корневой папке `real-chat-test` (там, где `client/` и `server/`):

```powershell
# 1) Инициализация
git init

# 2) Добавить все файлы
git add .

# 3) Создать первый коммит
git commit -m "Initial commit: Client and Server setup"

# 4) Добавить удалённый репозиторий (замени URL на свой)
git remote add origin https://github.com/<your-username>/<repo-name>.git

# 5) Отправить ветку main (если у тебя main)
git branch -M main
git push -u origin main
```

> Если при push появится ошибка авторизации, используй персональный токен (PAT) или настроенный SSH-ключ.

### Вариант B — через GitHub CLI (`gh`)

```powershell
# В корне проекта
gh repo create <your-username>/<repo-name> --public --source=. --remote=origin --push
```

`gh` создаст репозиторий и сразу запушит код.

## Что дальше

- После пуша можешь включить CI/CD (GitHub Actions) или добавить инструкцию по деплою.
- Я могу автоматически создать репозиторий и запушить (нужен доступ `gh` или токен) — хочешь, чтобы я подготовил команды для автоматизации?
