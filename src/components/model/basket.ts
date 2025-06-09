import { Product } from "../../types";

export class Basket {
  private products: Product[] = [];

  set addProduct(product: Product) {
    this.products.push(product);
  }

  set addProductList(list: Product[]) {
    this.products.push(...list);
  }

  get total(): number {
    return this.products.length;
  }

  get allpraise(): number {
    return this.products.reduce((sum, product) => sum + product.price, 0);
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