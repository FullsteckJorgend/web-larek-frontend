import { Product } from "../../types";
import { Api } from "../base/api";

export class CardAPI extends Api {

    getCardList(): Promise<{ total: number, items: Product[] }> {
        return this.get<{ total: number, items: Product[] }>('/product/');
    }

    getCard(id: number): Promise<Product> {
        return this.get<Product>(`/product/${id}`);
    }
}