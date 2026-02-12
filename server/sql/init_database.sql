-- ====================================
-- SQL инициализация для базы messenger
-- ====================================

-- 1. Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  phone TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Таблица контактов
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  is_online BOOLEAN NOT NULL DEFAULT TRUE
);

-- 3. Таблица сообщений
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================
-- Проверка созданных таблиц
-- ====================================
-- Чтобы проверить, что таблицы созданы, выполни:
-- \dt