# Miro Code — Проект веб-приложения

## Обзор проекта

**Miro Code** — это SPA-приложение на React для работы с досками (аналог Miro). Построено на современном стеке технологий с использованием Vite, TypeScript и Tailwind CSS.

### Основной стек

| Категория | Технологии |
|-----------|------------|
| **Фреймворк** | React 19 + TypeScript |
| **Сборка** | Vite 7 |
| **Стили** | Tailwind CSS 4 |
| **UI-компоненты** | shadcn/ui (New York style) + Radix UI |
| **Роутинг** | React Router DOM 7 |
| **State Management** | Zustand |
| **Data Fetching** | TanStack Query (React Query) + openapi-react-query |
| **API Client** | openapi-fetch (type-safe из OpenAPI схемы) |
| **Формы** | React Hook Form + Zod валидация |
| **Иконки** | Lucide React |
| **Mocking** | MSW (Mock Service Worker) |

### Архитектура

Проект использует **Feature-Sliced Design**-подобную архитектуру с чётким разделением на слои:

```
src/
├── app/                    # Верхнеуровневый слой (App, роутер, провайдеры)
│   ├── app.tsx            # Корневой компонент
│   ├── main.tsx           # Точка входа
│   ├── router.tsx         # Конфигурация роутинга
│   ├── providers.tsx      # Провайдеры (QueryClient)
│   ├── protected-route.tsx # Защищённые роуты
│   └── index.css          # Глобальные стили
│
├── features/              # Бизнес-фичи (независимые модули)
│   ├── auth/              # Аутентификация (login, register)
│   ├── board/             # Редактор доски
│   ├── boards-list/       # Список досок
│   └── header/            # Шапка приложения
│
└── shared/                # Переиспользуемый код
    ├── api/               # API клиент (openapi-fetch, React Query)
    │   ├── schema/        # OpenAPI схема и сгенерированные типы
    │   ├── mocks/         # MSW моки
    │   ├── instance.ts    # Настройка fetch клиента
    │   └── query-client.ts
    ├── model/             # Глобальная бизнес-логика
    │   ├── config.ts      # Конфигурация приложения
    │   ├── routes.tsx     # Константы путей
    │   └── session.ts     # Zustand store для сессии
    ├── lib/               # Утилиты и хелперы
    └── ui/                # UI-компоненты
        └── kit/           # shadcn/ui компоненты
```

### Dependency Graph (слои)

```
app → features → shared
```

- **shared** — не может импортировать `app` или `features`
- **features** — может импортировать `shared`, но не `app`
- **app** — может импортировать всё

## Сборка и запуск

### Установка зависимостей

```bash
npm install
```

### Команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev-сервера (Vite) |
| `npm run build` | Сборка продакшн-версии (`tsc -b && vite build`) |
| `npm run preview` | Предпросмотр собранной версии |
| `npm run lint` | Проверка ESLint |
| `npm run api` | Генерация TypeScript типов из OpenAPI схемы |

### Переменные окружения

Создайте `.env` файл на основе `.env.development`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Разработка

### Генерация API типов

При изменении OpenAPI схемы (`src/shared/api/schema/main.yaml`):

```bash
npm run api
```

Это сгенерирует типизированный клиент в `src/shared/api/schema/generated.ts`.

### Добавление UI-компонентов

Проект использует shadcn/ui. Для добавления новых компонентов:

```bash
npx shadcn add <component-name>
```

### Архитектурные ограничения (ESLint Boundaries)

Проект использует `eslint-plugin-boundaries` для контроля зависимостей между слоями:

1. **`boundaries/element-types`** — запрещает импорты «снизу вверх»:
   - `shared` → не может импортировать `app`, `features`
   - `features` → не может импортировать `app`

2. **`boundaries/entry-point`** — требует импорта через public API:
   - `features` должны импортироваться через `index.ts` или `*.page.tsx`
   - Нарушения выводятся с сообщением на русском языке

### Code Style

- **Prettier** — форматирование кода (конфиг в `.prettierrc.json`)
- **ESLint** — линтинг с плагинами:
  - `typescript-eslint` (recommended)
  - `eslint-plugin-react-hooks`
  - `eslint-plugin-react-refresh`
  - `eslint-plugin-boundaries`

### Типизация

Проект использует строгую типизацию TypeScript:

- `tsconfig.app.json` — настройки для приложения
- `tsconfig.node.json` — настройки для конфигов (Vite, ESLint)
- Path aliases: `@/*` → `src/*`

### Работа с API

API клиент автоматически добавляет JWT токен из `useSessionStore` к запросам:

```typescript
// Использование в компонентах
const { data } = rqClient.useQuery('GET', '/boards');
```

Для публичных endpoints (login, register, refresh) используйте `publicRqClient`.

### Аутентификация

- Токен хранится в `localStorage`
- Автоматический refresh при истечении срока действия
- Zustand store (`useSessionStore`) управляет состоянием сессии
- Защищённые роуты используют `protected-loader` и `ProtectedRoute`

### Mocking

MSW настроен для мокирования API в development-режиме:

- Моки находятся в `src/shared/api/mocks/`
- Включение через `enableMocking()` в `main.tsx`
- Worker файл: `public/mockServiceWorker.js`

## Тестирование

На момент анализа тесты не настроены. Рекомендуется добавить:

- **Unit-тесты**: Vitest + React Testing Library
- **E2E-тесты**: Playwright или Cypress

## Структура фич

Каждая фича в `features/` следует конвенции:

```
features/<name>/
├── index.tsx          # Public API фичи
├── *.page.tsx         # Страницы (для роутинга)
├── model/             # Локальная бизнес-логика
├── ui/                # Локальные UI-компоненты
└── api/               # Специфичные API вызовы (опционально)
```

## Ключевые файлы

| Файл | Описание |
|------|----------|
| `src/app/router.tsx` | Конфигурация роутинга с lazy-loading страниц |
| `src/shared/api/instance.ts` | Настройка openapi-fetch клиента с интерцепторами |
| `src/shared/model/session.ts` | Zustand store для управления сессией |
| `eslint.boundaries.js` | Конфигурация архитектурных ограничений |
| `components.json` | Конфигурация shadcn/ui |
