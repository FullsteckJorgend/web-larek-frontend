# Проектная работа: «Веб-ларёк»

[English version below / English version is after the Russian section]

Стек: HTML, SCSS, TypeScript, Webpack

## Структура проекта

- **src/** — исходные файлы проекта
  - **components/** — TypeScript-компоненты
    - **base/** — базовый код (абстрактные классы, событийная шина и др.)
    - **model/** — модели данных (бизнес-логика, состояние, API)
    - **view/** — компоненты представления (DOM, рендеринг)
  - **types/** — интерфейсы и типы TypeScript
  - **utils/** — утилиты и константы
  - **scss/** — стили (SCSS)
  - **pages/** — HTML-файлы

### Ключевые файлы

- `src/pages/index.html` — основной HTML-файл
- `src/types/index.ts` — типы и интерфейсы данных
- `src/index.ts` — точка входа приложения
- `src/scss/styles.scss` — корневой файл стилей
- `src/utils/constants.ts` — константы
- `src/utils/utils.ts` — утилиты

---

## Установка и запуск

```sh
npm install
npm run start
```
или
```sh
yarn
yarn start
```

## Сборка

```sh
npm run build
```
или
```sh
yarn build
```

---

## Архитектура

Приложение построено на **событийно-ориентированной архитектуре** с разделением ответственности по принципу **MVP (Model-View-Presenter)**:

- **Модели**: хранят и валидируют данные, работают с API, генерируют события при изменениях.
- **Представления (View)**: отображают данные, работают с DOM, генерируют события при действиях пользователя.
- **Событийная шина (EventEmitter)**: связывает модели и представления, всё взаимодействие — через события.
- **Презентер/Точка входа**: `src/index.ts` связывает модели, представления и обработчики событий.

### Используемые паттерны

- **Событийно-ориентированный**: все взаимодействия между модулями — через события.
- **MVP**: модели и представления не зависят друг от друга, точка входа выступает как презентер.

---

## Компоненты и их назначение

### Базовый код (`components/base/`)

- **Component<T>**: абстрактный класс для всех view-компонентов. Методы для работы с DOM, рендеринга и обновления состояния.
- **Model<T>**: абстрактный класс для моделей данных. Обеспечивает присвоение данных и генерацию событий.
- **EventEmitter**: событийная шина для связи моделей и представлений.

### Модели (`components/model/`)

- **DataCard**: управляет списком товаров каталога. Методы: установка/получение товаров, добавление, поиск по id.
- **DataBasket**: управляет состоянием корзины. Методы: добавление/удаление товаров, подсчёт суммы, получение id.
- **DataContact**: хранит и валидирует контактные данные пользователя (email, телефон).
- **DataDekivery**: хранит и валидирует данные о доставке (адрес, способ оплаты).
- **OrderAPI**: отправка заказа на сервер.
- **CardAPI**: получение списка товаров с сервера.

### Представления (`components/view/`)

- **CardView**: отображает карточку товара (каталог/детально), управляет кнопкой «В корзину».
- **BasketCardView**: отображает товар в корзине, удаление.
- **BasketView**: отображает корзину, сумму, кнопку оформления.
- **FormView**: отображает и управляет формами (доставка, контакты), валидация, сброс, ошибки.
- **ModalView**: управление модальными окнами (открытие, закрытие, вставка контента).
- **PageView**: управление основными областями страницы (каталог, корзина, блокировка интерфейса, счётчик корзины).
- **OrderView**: отображает сообщение об успешном заказе и сумму.

---

## Типы данных (`types/index.ts`)

- **IProduct**: товар каталога (title, image, category, price, id, description)
- **IProductBasket**: товар в корзине (numberCard, id, title, price)
- **ICard**: расширяет IProduct, добавляет флаг `button` для отображения кнопки
- **IProductListResponse**: ответ сервера со списком товаров (total, items)
- **IContact**: контактные данные пользователя (email, phone)
- **IDelivery**: данные о доставке (payment, address)
- **IOrderRequest**: заказ для отправки на сервер (наследует IContact, IDelivery, добавляет total, items)
- **IOrderResponse**: ответ сервера при успешном заказе (id, total)

---

## Интерфейсы компонентов

### Component<T> (базовый для всех view)

- **render(data?: Partial<T>): HTMLElement** — рендер компонента с новыми данными.
- **setText(element, value)** — установка текстового содержимого.
- **setImage(element, src, alt?)** — установка изображения.
- **setDisabled(element, state)** — блокировка/разблокировка элемента.
- **toggleClass(element, className, force?)** — переключение CSS-класса.

### Model<T> (базовый для всех моделей)

- **emitChanges(event, payload?)** — генерация события при изменении модели.

### EventEmitter

- **on(event, handler)** — подписка на событие.
- **emit(event, payload?)** — генерация события.

---

## Взаимодействие частей приложения

1. **Действие пользователя** (например, клик «В корзину») инициирует событие во **View**.
2. **View** генерирует событие через **EventEmitter**.
3. **Точка входа** (`index.ts`) слушает события, обновляет **Model** или инициирует обновление других **View**.
4. **Model** генерирует событие при изменении данных.
5. **View** слушают события моделей и обновляют DOM.

Всё взаимодействие — только через события, что обеспечивает слабую связанность.

---

## Пример: добавление товара в корзину

1. Пользователь кликает «В корзину» в **CardView**.
2. **CardView** генерирует событие `'basket:edit'` с id товара.
3. **index.ts** обрабатывает `'basket:edit'`, обновляет **DataBasket**.
4. **DataBasket** генерирует `'basket:changed'`.
5. **BasketView** и **PageView** обновляют интерфейс корзины и счётчик.

---

## Резюме

- **Слабая связанность** через событийную шину.
- **Разделение ответственности**: модели (данные), представления (UI), точка входа (связь).
- **Типобезопасность** через интерфейсы TypeScript.
- **Расширяемость**: новые модели/представления легко добавлять.

---

---

# Project Work: "Web Stall"

Stack: HTML, SCSS, TypeScript, Webpack

## Project Structure

- **src/** — project source files
  - **components/** — TypeScript components
    - **base/** — base code (abstract classes, event bus, etc.)
    - **model/** — data models (business logic, state, API)
    - **view/** — view components (DOM interaction, rendering)
  - **types/** — TypeScript interfaces and types
  - **utils/** — utility functions and constants
  - **scss/** — styles (SCSS)
  - **pages/** — HTML files

### Key Files

- `src/pages/index.html` — main page HTML
- `src/types/index.ts` — data types/interfaces
- `src/index.ts` — application entry point
- `src/scss/styles.scss` — root stylesheet
- `src/utils/constants.ts` — constants
- `src/utils/utils.ts` — utility functions

---

## Installation and Running

```sh
npm install
npm run start
```
or
```sh
yarn
yarn start
```

## Build

```sh
npm run build
```
or
```sh
yarn build
```

---

## Architecture Overview

The application uses an **event-driven architecture** with a separation of concerns similar to the **MVP (Model-View-Presenter)** pattern:

- **Models**: Store and validate data, interact with APIs, emit events on changes.
- **Views**: Render data, handle DOM, emit events on user actions.
- **Event Bus (EventEmitter)**: Decouples models and views, all communication is via events.
- **Presenter/Entry Point**: `src/index.ts` wires up models, views, and event handlers.

### Architectural Patterns

- **Event-driven**: All interactions between modules are performed via events.
- **MVP-like**: Models and Views are decoupled, with the entry point acting as a Presenter.

---

## Components and Their Responsibilities

### Base Code (`components/base/`)

- **Component<T>**: Abstract class for all view components. Provides methods for DOM manipulation, rendering, and state updates.
- **Model<T>**: Abstract class for data models. Handles data assignment and event emission.
- **EventEmitter**: Event bus for communication between models and views.

### Models (`components/model/`)

- **DataCard**: Manages catalog product list. Methods: set/get products, add, search by id.
- **DataBasket**: Manages basket state. Methods: add/remove products, calculate total, get all ids.
- **DataContact**: Stores and validates user contact data (email, phone).
- **DataDekivery**: Stores and validates delivery data (address, payment).
- **OrderAPI**: Handles order submission to the server.
- **CardAPI**: Handles product list retrieval from the server.

### Views (`components/view/`)

- **CardView**: Renders a product card (catalog or full view), manages "Add to basket" button.
- **BasketCardView**: Renders a product in the basket, handles removal.
- **BasketView**: Renders the basket, total price, and order button.
- **FormView**: Renders and manages forms (delivery, contacts), validation, reset, error display.
- **ModalView**: Manages modal windows (open, close, insert content).
- **PageView**: Manages main page areas (catalog, basket, layout, interface lock, basket counter).
- **OrderView**: Displays order success message and amount.

---

## Data Types (`types/index.ts`)

- **IProduct**: Catalog product (title, image, category, price, id, description)
- **IProductBasket**: Product in basket (numberCard, id, title, price)
- **ICard**: Extends IProduct, adds `button` flag for "Add to basket"
- **IProductListResponse**: Server response with product list (total, items)
- **IContact**: User contact data (email, phone)
- **IDelivery**: Delivery data (payment, address)
- **IOrderRequest**: Order to send to server (extends IContact, IDelivery, adds total, items)
- **IOrderResponse**: Server response on successful order (id, total)

---

## Component Interfaces

### Component<T> (base for all views)

- **render(data?: Partial<T>): HTMLElement** — renders the component with new data.
- **setText(element, value)** — sets text content.
- **setImage(element, src, alt?)** — sets image source and alt.
- **setDisabled(element, state)** — enables/disables element.
- **toggleClass(element, className, force?)** — toggles CSS class.

### Model<T> (base for all models)

- **emitChanges(event, payload?)** — emits an event when model changes.

### EventEmitter

- **on(event, handler)** — subscribe to event.
- **emit(event, payload?)** — emit event.

---

## Interaction Flow

1. **User Action** (e.g., clicks "Add to basket") triggers a **View** event.
2. **View** emits an event via **EventEmitter**.
3. **Entry Point** (`index.ts`) listens for events, updates **Model** or triggers another **View** update.
4. **Model** emits change events when data updates.
5. **Views** listen for model change events and update the DOM accordingly.

All communication is via events, ensuring loose coupling.

---

## Example: Adding Product to Basket

1. User clicks "Add to basket" in **CardView**.
2. **CardView** emits `'basket:edit'` with product id.
3. **index.ts** handles `'basket:edit'`, updates **DataBasket**.
4. **DataBasket** emits `'basket:changed'`.
5. **BasketView** and **PageView** update basket UI and counter.

---

## Summary

- **Loose coupling** via event bus.
- **Separation of concerns**: models (data), views (UI), entry point (wiring).
- **Type safety** via TypeScript interfaces.
- **Extensible**: new models/views can be added with minimal changes.

---
