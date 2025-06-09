#Project Work: "Web Stall"

Stack: HTML, SCSS, TypeScript, Webpack

Project Structure:
- src/ — source files of the project
- src/components/ — folder with JS components
- src/components/base/ — folder with base code

Important Files:
- src/pages/index.html — main page HTML file
- src/types/index.ts — file with types
- src/index.ts — application entry point
- src/scss/styles.scss — root stylesheet
- src/utils/constants.ts — file with constants
- src/utils/utils.ts — file with utility functions

Installation and Running

## To install and run the project, execute the following commands:
```
npm install
npm run start
```
or
```
yarn
yarn start
```
Build
```
npm run build
```
or
```
yarn build
```

 
# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```
### Модель данных

Product — Товар
```
interface Product {
  id: string;               // Уникальный идентификатор товара
  title: string;            // Название товара
  description: string;      // Описание
  image: string;            // Путь к изображению
  category: string;         // Категория товара
  price: number | null;     // Цена (может быть null)
}
```

ProductListResponse — Список товаров
```
interface ProductListResponse {
  total: number;       // Общее количество товаров
  items: Product[];    // Список товаров
}
```

OrderRequest — Заказ
```
interface OrderRequest {
  payment: "online" | "cash";  // Способ оплаты
  email: string;               // Email покупателя
  phone: string;               // Телефон
  address: string;             // Адрес доставки
  total: number;               // Сумма заказа
  items: string[];             // Массив ID товаров
}
```

OrderResponse — Ответ при успешном заказе
```
interface OrderResponse {
  id: string;       // ID заказа
  total: number;    // Подтвержденная сумма заказа
}
```

ErrorResponse — Ошибка
```
interface ErrorResponse {
  error: string;     // Сообщение об ошибке
}
```

API Эндпоинты
  Получить список товаров
   GET /product/
   Ответ: ProductListResponse
   
  Получить товар по ID
   GET /product/:id
   Ответ:
    200 OK: Product
    404 Not Found: ErrorResponse


Оформить заказ
   POST /order
   Тело запроса: OrderRequest
   Ответ:
    200 OK: OrderResponse
    400 Bad Request: ErrorResponse
