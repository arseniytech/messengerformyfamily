# ChillingChat

A small messenger built to show how I work **end‑to‑end**: modern React front‑end, Node/Express API, and a PostgreSQL database (optionally via Docker).  
Небольшой мессенджер, демонстрирующий мою работу **end-to-end**: современный фронтенд на React, API на Node/Express и база данных PostgreSQL (опционально через Docker).

## Tech stack / Технологии

- **React 19 + TypeScript**  
- **Vite** (fast dev/build tooling) / быстрые инструменты разработки и сборки  
- **React Router** (`/`, `/calls`, `/settings`) / навигация между страницами  
- **Zustand** (lightweight global state) / лёгкое глобальное состояние  
- **Node.js + Express** (REST API) / сервер с REST API  
- **PostgreSQL** (contacts and messages data) / база данных контактов и сообщений  
- **Docker Compose** (local Postgres container) / локальный контейнер Postgres через Docker

## Features / Функционал

- **Messenger layout** with sidebar, chat list, and main chat window / макет мессенджера с боковой панелью, списком чатов и основной областью сообщений  
- **Contacts loaded from a real database** via the `/contacts` API endpoint / контакты загружаются из реальной базы данных через эндпоинт `/contacts`  
- **Per‑contact message history** stored in a central Zustand store / история сообщений каждого контакта хранится в центральном Zustand store  
- **Keyboard‑friendly input** (Enter to send, Shift+Enter for new line) / удобный ввод с клавиатуры (Enter — отправка, Shift+Enter — новая строка)  
- **Live clock and navigation** between Chats, Calls, and Settings / живые часы и навигация между Чатами, Звонками и Настройками

## Backend API (short) / API сервера (кратко)

- `GET /health` – server status / статус сервера  
- `GET /test-db` – database connectivity check / проверка подключения к базе  
- `GET /contacts` – list contacts from PostgreSQL / список контактов из PostgreSQL

## Architecture / Архитектура

- **`server/`** – Express API using `pg` to talk to PostgreSQL (`db.js` handles the connection)  
  / сервер на Express с использованием `pg` для работы с PostgreSQL (`db.js` управляет подключением)  
- **`messageStore`** – central store for contacts, active user and messages / центральное хранилище контактов, активного пользователя и сообщений  
- **`useChat` hook** – encapsulates send‑message logic and guards against empty input / хук для логики отправки сообщений с проверкой пустого ввода  
- **UI components** (`Sidebar`, `ChatWindow`, `ChatList`, `Message`) composed into a simple layout  
  / компоненты интерфейса (`Sidebar`, `ChatWindow`, `ChatList`, `Message`), собранные в простой макет

## Running locally / Локальный запуск

### Without Docker / Без Docker

1. Start a local PostgreSQL instance and create tables `contacts` and `messages`.  
   / Запустите локальный экземпляр PostgreSQL и создайте таблицы `contacts` и `messages`.  
2. Update connection settings in `server/db.js` if needed.  
   / При необходимости обновите настройки подключения в `server/db.js`.  
3. Start the backend:  
   / Запуск сервера:

```bash
cd server
npm install
node index.js
