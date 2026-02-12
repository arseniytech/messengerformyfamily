# Family Messenger

A private messenger built for my family as a reliable alternative when major messengers became unstable — phone/PIN auth, text/media/groups, minimalist iMessage-inspired design.  
Приватный мессенджер для моей семьи как надёжная альтернатива нестабильным крупным мессенджерам — авторизация по телефону/ПИН, текст/медиа/группы, минималистичный дизайн в стиле iMessage.

## Tech stack / Технологии

- **React 19 + TypeScript**  
- **Vite** (fast dev/build tooling) / быстрые инструменты разработки и сборки  
- **React Router** (`/`, `/calls`, `/settings`) / навигация между страницами  
- **Zustand** (lightweight global state) / лёгкое глобальное состояние  
- **Node.js + Express** (REST API with JWT auth) / сервер с REST API и JWT авторизацией  
- **PostgreSQL** (users, contacts, messages) / база данных пользователей, контактов и сообщений  
- **Docker Compose** (local Postgres container) / локальный контейнер Postgres через Docker  
- **bcrypt** (PIN hashing) / хеширование ПИН-кодов  
- **WebRTC** (planned for voice/video calls) / планируется для аудио/видеозвонков

## Features / Функционал

- **Phone + PIN authentication** (family-only, no public registration) / авторизация по телефону + ПИН (только семья, без публичной регистрации)  
- **1-on-1 and group chats** with text messages / чаты 1-на-1 и групповые с текстовыми сообщениями  
- **Media sharing** (photos, videos, files, music) / обмен медиа (фото, видео, файлы, музыка)  
- **Message history** stored in PostgreSQL / история сообщений в PostgreSQL  
- **Minimalist UI** inspired by iMessage (clean, large text, easy for all ages) / минималистичный интерфейс в стиле iMessage (чистый, крупный текст, удобен для всех возрастов)  
- **Keyboard-friendly** (Enter to send, Shift+Enter for new line) / удобный ввод с клавиатуры (Enter — отправка, Shift+Enter — новая строка)  
- **Live clock and navigation** between Chats, Calls, Settings / живые часы и навигация между Чатами, Звонками, Настройками

**In progress / В разработке:**  
- Voice messages / голосовые сообщения  
- Audio/video calls (WebRTC) / аудио/видеозвонки  
- Native apps (.apk for Android, iOS, Desktop via Electron) / нативные приложения

## Backend API (short) / API сервера (кратко)

- `POST /auth/login` – phone + PIN auth, returns JWT / авторизация по телефону + ПИН, возвращает JWT  
- `GET /contacts` – list contacts (requires auth) / список контактов (требуется авторизация)  
- `GET /messages?withUserId=<id>` – load chat history / загрузка истории чата  
- `POST /messages` – send message / отправка сообщения  
- `GET /health` – server status / статус сервера  
- `GET /test-db` – database connectivity check / проверка подключения к базе

## Architecture / Архитектура

- **`server/`** – Express API using `pg` to talk to PostgreSQL (`db.js` handles connection, `authMiddleware` validates JWT)  
  / сервер на Express с использованием `pg` для работы с PostgreSQL (`db.js` управляет подключением, `authMiddleware` проверяет JWT)  
- **`authStore`** (Zustand) – manages user session and JWT token in `localStorage` / управление сессией пользователя и JWT токеном в `localStorage`  
- **`messageStore`** (Zustand) – central store for contacts and messages / центральное хранилище контактов и сообщений  
- **`useChat` hook** – encapsulates send-message logic and guards against empty input / хук для логики отправки сообщений с проверкой пустого ввода  
- **UI components** (`Sidebar`, `ChatWindow`, `ChatList`, `Message`, `LoginPage`) composed into protected routes  
  / компоненты интерфейса (`Sidebar`, `ChatWindow`, `ChatList`, `Message`, `LoginPage`), собранные в защищённые маршруты

## Running locally / Локальный запуск

### With Docker / С Docker

1. Start PostgreSQL container:  
   / Запуск контейнера PostgreSQL:

```bash
docker-compose up -d db
```

2. Connect to the database and create tables:  
   / Подключиться к базе и создать таблицы:

```bash
docker exec -it messenger-db psql -U messenger_user -d messenger
```

Inside `psql` / Внутри `psql`:

```sql
-- Create users table / Создать таблицу пользователей
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  phone TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create contacts table / Создать таблицу контактов
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  is_online BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create messages table / Создать таблицу сообщений
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

3. Generate PIN hash and create users:  
   / Сгенерировать хэш ПИН и создать пользователей:

```bash
cd server
npm install
node utils/hash-pin.js 1234  # Replace with your PIN / замените на ваш ПИН
```

Copy the hash and insert users / Скопировать хэш и добавить пользователей:

```sql
INSERT INTO users (phone, display_name, password_hash)
VALUES ('+79991234567', 'Мама', '<paste_hash_here>');

INSERT INTO users (phone, display_name, password_hash)
VALUES ('+79997654321', 'Сеня', '<paste_hash_here>');
```

Add contacts (must match user IDs) / Добавить контакты (должны совпадать с ID пользователей):

```sql
INSERT INTO contacts (username, display_name, is_online)
VALUES ('mama', 'Мама', TRUE);

INSERT INTO contacts (username, display_name, is_online)
VALUES ('senya', 'Сеня', TRUE);
```

4. Start the backend:  
   / Запуск сервера:

```bash
cd server
node index.js
# Server runs on http://localhost:4000
```

5. Start the frontend:  
   / Запуск фронтенда:

```bash
npm install
npm run dev
# Opens at http://localhost:5173
```

6. Login with phone + PIN, select a contact, and start chatting!  
   / Войти с телефоном + ПИН, выбрать контакт и начать общаться!

### Without Docker / Без Docker

1. Install and start PostgreSQL locally, create database `messenger`  
   / Установить и запустить PostgreSQL локально, создать базу `messenger`  
2. Update `server/db.js` connection settings if needed  
   / При необходимости обновить настройки подключения в `server/db.js`  
3. Follow steps 2-6 above / Следовать шагам 2-6 выше

## Security / Безопасность

- **Closed registration**: family members only, accounts created manually by admin  
  / закрытая регистрация: только члены семьи, аккаунты создаются вручную администратором  
- **Phone + 4-digit PIN** authentication with bcrypt hashing  
  / авторизация по телефону + 4-значный ПИН с хешированием через bcrypt  
- **JWT tokens** with 12-hour expiration  
  / JWT токены с истечением через 12 часов  
- **Self-hosted**: all data stored on your own server  
  / самохостинг: все данные хранятся на вашем собственном сервере

## Project structure / Структура проекта

```
messenger_rodstveniki/
├── server/              # Backend (Node.js + Express)
│   ├── index.js        # Main server file / основной файл сервера
│   ├── db.js           # PostgreSQL connection / подключение к PostgreSQL
│   ├── sql/            # SQL scripts / SQL-скрипты
│   └── utils/          # Utilities (hash-pin.js)
├── src/                # Frontend (React)
│   ├── components/     # UI components / компоненты интерфейса
│   ├── pages/          # Pages (LoginPage) / страницы
│   ├── store/          # Zustand stores (authStore, messageStore)
│   └── hooks/          # Custom hooks (useChat)
├── docker-compose.yml  # Docker config / конфигурация Docker
└── package.json        # Frontend dependencies / зависимости фронтенда
```

## Roadmap / План развития

**Phase 1: Core messenger** ✅  
/ Фаза 1: Основной мессенджер
- [x] Phone + PIN auth / авторизация по телефону + ПИН  
- [x] Text chats 1-on-1 / текстовые чаты 1-на-1  
- [x] Group chats / групповые чаты  
- [x] Media sharing (photos/videos/files/music) / обмен медиа

**Phase 2: Voice features** (in progress)  
/ Фаза 2: Голосовые функции (в процессе)
- [ ] Voice messages / голосовые сообщения  
- [ ] Audio calls 1-on-1 (WebRTC) / аудиозвонки 1-на-1  
- [ ] Group audio calls / групповые аудиозвонки

**Phase 3: Video calls**  
/ Фаза 3: Видеозвонки
- [ ] Video calls 1-on-1 / видеозвонки 1-на-1  
- [ ] Group video calls / групповые видеозвонки

**Phase 4: Native apps**  
/ Фаза 4: Нативные приложения
- [ ] Android (.apk) / Android приложение  
- [ ] iOS (TestFlight) / iOS приложение  
- [ ] Desktop (Electron) / десктоп приложение

---

**Author / Автор:** Arseniy  
**Built with ❤️ for family / Сделано с ❤️ для семьи**
