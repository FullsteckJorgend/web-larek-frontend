// Product — Товар
export interface IProduct {
  title: string;  // Название товара
  image: string;  // Путь к изображению
  category: string;   // Категория товара
  price: number | null; // Цена (может быть null)
  id: string;               // Уникальный идентификатор товара
  description: string;      // Описание
}

export interface IProductBasket {
  numberCard: number;
  id: string;               // Уникальный идентификатор товара
  title: string;  // Название товара
  price: number | null;  // Цена (может быть null)
}

export interface ICard extends IProduct {
  button: boolean; // Кнопка для добавления в корзину
}

// ProductListResponse — Список товаров
export interface IProductListResponse {
  total: number;       // Общее количество товаров
  items: IProduct[];    // Список товаров
}

export interface IContact {
  email: string;               // Email покупателя
  phone: string;               // Телефон
}

export interface IDelivery {
  payment: "card" | "cash" | "";  // Способ оплаты
  address: string;             // Адрес доставки
}

// OrderRequest — Собранный заказ
export interface IOrderRequest extends IContact, IDelivery {
  total: number;               // Сумма заказа
  items: string[];             // Массив ID товаров
}


// OrderResponse — Ответ при успешном заказе
export interface IOrderResponse {
  id: string;       // ID заказа
  total: number;    // Подтвержденная сумма заказа
}
