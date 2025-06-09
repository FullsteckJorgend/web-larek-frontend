import { Product } from "../../types";

export class DataCard {
  private products: Product[] = [];

set addproductList(list: Product[]) {
  if (!Array.isArray(list)) {
    throw new TypeError("Ожидался массив продуктов, а пришло: " + typeof list);
  }
  this.products.push(...list);
}

  set addProduct(product: Product) {
    this.products.push(product);
  }

  get total(): number {
    return this.products.length;
  }

  getProduct(index: number): Product {
    if (index < 0 || index >= this.products.length) {
      throw new Error(`Ошибка: под индексом ${index} нечего нету. Максимальный индекс: ${this.products.length - 1}`);
    }
    return this.products[index];
  }

  get allProducts(): Product[] {
    return this.products;
  }
}