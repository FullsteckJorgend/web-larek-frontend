import { IOrderRequest, IOrderResponse } from "../../types";
import { Api } from "../base/api";

export class OrderAPI extends Api {

    postOrder(data: IOrderRequest): Promise<IOrderResponse> {
        return this.post<IOrderResponse>('/order/', data);
    }
}