import { IProduct } from "../../types";
import { Api } from "../base/api";

export class CardAPI extends Api {

    getCardList(): Promise<{ total: number, items: IProduct[] }> {
        return this.get<{ total: number, items: IProduct[] }>('/product/');
    }

    getCard(id: number): Promise<IProduct> {
        return this.get<IProduct>(`/product/${id}`);
    }
}