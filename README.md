# ChillingChat

A small, focused messenger UI built with **React + TypeScript** to showcase my front‑end skills: state management, component architecture, and UX details.  
Небольшой, целенаправленный мессенджер на **React + TypeScript**, демонстрирующий навыки фронтенд-разработки: управление состоянием, архитектуру компонентов и детали UX.

## Tech stack / Технологии

- **React 19 + TypeScript**  
- **Vite** for fast dev/build / для быстрой разработки и сборки  
- **React Router** for multi-page navigation (`/`, `/calls`, `/settings`) / для навигации между страницами  
- **Zustand** for lightweight global state management / для лёгкого управления глобальным состоянием

## Features / Функционал

- **Messenger layout** with sidebar, chat list, and main chat window / макет мессенджера с боковой панелью, списком чатов и основной областью сообщений  
- **Per-contact message history** stored centrally in a Zustand store / история сообщений каждого контакта хранится централизованно в Zustand  
- **Active chat selection** and smooth auto-scroll to the latest message / выбор активного чата и плавная прокрутка к последнему сообщению  
- **Keyboard-friendly input** (Enter to send, Shift+Enter for new line) / удобный ввод с клавиатуры (Enter — отправка, Shift+Enter — новая строка)  
- **Live clock and navigation** between Chats, Calls, and Settings / живые часы и навигация между Чатами, Звонками и Настройками

## Architecture / Архитектура

- **`messageStore`**: central source of truth for contacts, active user, and messages / централизованное хранилище контактов, активного пользователя и сообщений  
- **`useChat` hook**: encapsulates send-message logic and guards (trimming, empty checks) / хук, инкапсулирующий логику отправки сообщений с проверками (обрезка, пустые сообщения)  
- **Presentational components** (`Sidebar`, `ChatWindow`, `Message`, `ChatList`) composed into a simple page layout / презентационные компоненты, собранные в простой макет страницы

## Running locally / Локальный запуск

```bash
npm install
npm run dev

