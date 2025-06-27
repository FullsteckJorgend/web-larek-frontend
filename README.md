# Project Work: "Web Stall"

Stack: HTML, SCSS, TypeScript, Webpack

Project Structure:

- src/ — project source files
- src/components/ — folder with TypeScript components
- src/components/base/ — folder with base code

Important Files:

- src/pages/index.html — main page HTML file
- src/types/index.ts — types file
- src/index.ts — application entry point
- src/scss/styles.scss — root stylesheet
- src/utils/constants.ts — constants file
- src/utils/utils.ts — utility functions file

## Installation and Running

To install and run the project, execute:

```
npm install
npm run start
```

or

```
yarn
yarn start
```

## Build

```
npm run build
```

or

```
yarn build
```

## Types

The project uses the following main data types (interfaces), defined in `/src/types/index.ts`:

1. IProduct  
   Describes a catalog product:  
   title, image, category, price, id, description.

2. IProductBasket  
   Describes a product in the basket:  
   numberCard, id, title, price.

3. ICard  
   Inherits IProduct, adds a `button` flag (for displaying the "Add to basket" button).

4. IProductListResponse  
   Server response with a list of products:  
   total (total count), items (array of products).

5. IContact  
   User contact data:  
   email, phone.

6. IDelivery  
   Delivery data:  
   payment (payment type: "card" | "cash" | ""), address.

7. IOrderRequest  
   Order to be sent to the server (inherits IContact and IDelivery):  
   total, items (array of product ids), address, payment, email, phone.

8. IOrderResponse  
   Server response on successful order:  
   id (order id), total (confirmed order amount).

These types are used in all application layers:

- Models — for storing and validating data.
- Views — for displaying information.
- Presenter — for passing data between layers and working with the API.

## Data Models

Models (model folder):

1. DataCard  
   Responsible for storing and managing the catalog product list. Provides methods for getting, adding, and searching products.

2. DataBasket  
   Manages the user's basket: adds and removes products, calculates the total cost, provides the list of products in the basket.

3. DataContact  
   Stores and validates user contact data (email, phone). Provides methods for updating, checking, and resetting this data.

4. DataDekivery  
   Stores and validates delivery data (address, payment method). Provides methods for updating, checking, and resetting this data.

5. OrderAPI  
   Encapsulates server interaction for order processing: sends order data and receives a response.

6. CardAPI  
   Encapsulates server interaction for products: gets the product list and individual product cards.

Model responsibilities:

- Store and change application data state.
- Validate data.
- Provide an interface for other layers (view, presenter).
- Interact with external data sources (API).
- Models do not contain DOM or rendering code.

## Views

Views (view folder)  
Views are responsible for displaying data, working with DOM elements, updating the interface, and handling user events. They receive data from models and presenters, display it, and react to user actions, but do not contain business logic.

Main classes:

1. CardView  
   Displays a product card in the catalog and in detail, manages the "Add to basket" button state.

2. BasketCardView  
   Displays a single product in the basket, manages its display and removal.

3. BasketView  
   Manages the display of the entire basket: product list, total amount, order button.

4. FormView  
   Manages the display and validation of forms (delivery, contacts), resets fields, displays errors, manages button and radio states.

5. ModalView  
   Manages modal windows: opening, closing, inserting content.

6. PageView  
   Manages main page areas: catalog, basket, layout, interface locking, basket counter display, etc.

7. OrderView  
   Displays the final message about a successful order and the amount charged.

View responsibilities:

- Work with the DOM: create, modify, delete elements.
- Display data received from models/presenters.
- React to user actions and generate events for other application layers.
- Do not contain business logic or store application state.

## Events

1. catalog:updated  
   Catalog update (render cards after loading or data change).

2. product:open-full  
   Open detailed product card in a modal window.

3. basket:open-modal  
   Open the basket in a modal window.

4. modal:close  
   Close any modal window.

5. basket:add-product  
   Add a product to the basket.

6. basket:remove-product  
   Remove a product from the basket.

7. basket:counter-updated  
   Update the basket item counter (e.g., in the site header).

8. basket:summary-updated  
   Update the basket total amount.

9. basket:cards-updated  
   Update the list of product cards in the basket.

10. order:open-form  
    Open the order form.

11. order:payment-changed  
    Change payment method.

12. order:address-changed  
    Change delivery address.

13. order:delivery-validate  
    Validate delivery data.

14. order:delivery-submit  
    Submit delivery data.

15. contacts:email-changed  
    Change email in the contacts form.

16. contacts:phone-changed  
    Change phone in the contacts form.

17. contacts:validate  
    Validate contact data.

18. contacts:submit  
    Submit contact data.

19. order:success-close  
    Close the successful order window.

# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с TypeScript компонентами
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

### Типы

В проекте используются следующие основные типы данных (интерфейсы), которые определены в файле /src/types/index.ts:

Основные типы данных

1. IProduct
   Описывает товар каталога:
   title, image, category, price, id, description.

2. IProductBasket
   Описывает товар в корзине:
   numberCard, id, title, price.

3. ICard
   Наследует IProduct, добавляет флаг button (для отображения кнопки "В корзину").

4. IProductListResponse
   Ответ сервера со списком товаров:
   total (общее количество), items (массив товаров).

5. IContact
   Контактные данные пользователя:
   email, phone.

6. IDelivery
   Данные о доставке:
   payment (тип оплаты: "card" | "cash" | ""), address.

7. IOrderRequest
   Собранный заказ для отправки на сервер (наследует IContact и IDelivery):
   total, items (массив id товаров), address, payment, email, phone.

8. IOrderResponse
   Ответ сервера при успешном заказе:
   id (id заказа), total (подтверждённая сумма заказа).

Эти типы используются во всех слоях приложения:

Модели (model) — для хранения и валидации данных.
Представления (view) — для отображения информации.
Презентер — для передачи данных между слоями и работы с API.

### Модели данных

Модели (папка model)

1. DataCard
   Отвечает за хранение и управление списком товаров каталога. Предоставляет методы для получения, добавления и поиска товаров.

2. DataBasket
   Управляет корзиной пользователя: добавляет и удаляет товары, считает итоговую стоимость, предоставляет список товаров в корзине.

3. DataContact
   Хранит и валидирует контактные данные пользователя (email, телефон). Предоставляет методы для обновления, проверки и сброса этих данных.

4. DataDekivery
   Хранит и валидирует данные о доставке (адрес, способ оплаты). Предоставляет методы для обновления, проверки и сброса этих данных.

5. OrderAPI
   Инкапсулирует работу с сервером по оформлению заказа: отправляет данные заказа и получает ответ.

6. CardAPI
   Инкапсулирует работу с сервером по товарам: получает список товаров и отдельные карточки товара.

Область ответственности моделей:

Хранение и изменение состояния данных приложения.
Валидация данных.
Предоставление интерфейса для работы с данными другим слоям приложения (view, presenter).
Взаимодействие с внешними источниками данных (API).
Модели не содержат кода, связанного с DOM и отображением.

### Отображение

Представления (папка view)
View (представления) отвечают за отображение данных, работу с DOM-элементами, обновление интерфейса и обработку пользовательских событий. Они получают данные от моделей и презентеров, отображают их, а также реагируют на действия пользователя, но не содержат бизнес-логику.

Основные классы:

1. CardView
   Отвечает за отображение карточки товара в каталоге и в подробном виде, управление состоянием кнопки "В корзину".

2. BasketCardView
   Отвечает за отображение отдельного товара в корзине, управление его отображением и удалением.

3. BasketView
   Управляет отображением всей корзины: список товаров, итоговая сумма, кнопка оформления заказа.

4. FormView
   Управляет отображением и валидацией форм (доставка, контакты), сбрасывает поля, отображает ошибки, управляет состоянием кнопок и radio.

5. ModalView
   Управляет отображением модальных окон, их открытием и закрытием, вставкой контента.

6. PageView
   Управляет основными областями страницы: каталог, корзина, общий лейаут, блокировка интерфейса, отображение счётчика корзины и т.д.

7. OrderView
   Отвечает за отображение итогового сообщения об успешном заказе и суммы списанных средств.

Область ответственности представлений:

Работа с DOM: создание, изменение, удаление элементов.
Отображение данных, полученных от моделей/презентеров.
Реакция на пользовательские действия и генерация событий для других слоёв приложения.
Не содержат бизнес-логику и не хранят состояние приложения.

### События

1. catalog:updated  
   Обновление каталога товаров (рендер карточек после загрузки или изменения данных).

2. product:open-full  
   Открытие подробной карточки товара в модальном окне.

3. basket:open-modal  
   Открытие корзины в модальном окне.

4. modal:close  
   Закрытие любого модального окна.

5. basket:add-product  
   Добавление товара в корзину.

6. basket:remove-product  
   Удаление товара из корзины.

7. basket:counter-updated  
   Обновление счётчика товаров в корзине (например, в шапке сайта).

8. basket:summary-updated  
   Обновление итоговой суммы корзины.

9. basket:cards-updated  
   Обновление списка карточек товаров в корзине.

10. order:open-form  
    Открытие формы оформления заказа.

11. order:payment-changed  
    Изменение способа оплаты.

12. order:address-changed  
    Изменение адреса доставки.

13. order:delivery-validate  
    Проверка валидности данных доставки.

14. order:delivery-submit  
    Отправка данных доставки.

15. contacts:email-changed  
    Изменение email в форме контактов.

16. contacts:phone-changed  
    Изменение телефона в форме контактов.

17. contacts:validate  
    Проверка валидности контактных данных.

18. contacts:submit  
    Отправка контактных данных.

19. order:success-close  
    Закрытие окна успешного заказа.