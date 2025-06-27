import { ICard, IProduct } from '../../types';
import { IEvents } from '../base/events';

export class DataCard {
	private products: IProduct[] = [];

	constructor(protected eventsHub: IEvents) {}

	set productList(list: IProduct[]) {
		if (!Array.isArray(list)) {
			throw new TypeError(
				'Ожидался массив продуктов, а пришло: ' + typeof list
			);
		}
		this.products = [...list];
		this.eventsHub.emit('cards:changed');
	}


	addProduct(product: IProduct): void {
		this.products.push(product);
		this.eventsHub.emit('cards:changed');
	}

	getProductById(id: string): IProduct | undefined {
		return this.products.find((p) => p.id === id);
	}

	get all(): IProduct[] {
		return [...this.products]; 
	}
}
