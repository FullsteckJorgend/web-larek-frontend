// Product — Товар
export interface Product {
  id: string;               // Уникальный идентификатор товара
  title: string;            // Название товара
  description: string;      // Описание
  image: string;            // Путь к изображению
  category: string;         // Категория товара
  price: number | null;     // Цена (может быть null)
}

// ProductListResponse — Список товаров
export interface ProductListResponse {
  total: number;       // Общее количество товаров
  items: Product[];    // Список товаров
}


// OrderRequest — Заказ
export interface OrderRequest {
  payment: "online" | "cash";  // Способ оплаты
  email: string;               // Email покупателя
  phone: string;               // Телефон
  address: string;             // Адрес доставки
  total: number;               // Сумма заказа
  items: string[];             // Массив ID товаров
}


// OrderResponse — Ответ при успешном заказе
export interface OrderResponse {
  id: string;       // ID заказа
  total: number;    // Подтвержденная сумма заказа
}


// ErrorResponse — Ошибка
export interface ErrorResponse {
  error: string;     // Сообщение об ошибке
}
