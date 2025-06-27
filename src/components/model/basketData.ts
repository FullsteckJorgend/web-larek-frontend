import { IProduct } from '../../types';
import { IEvents } from '../base/events';

export class DataBasket {
	private products: IProduct[] = [];
	private eventsHub: IEvents;

	constructor(eventsHub: IEvents) {
		this.eventsHub = eventsHub;
	}

	addProduct(product: IProduct): void {
		this.products.push(product);
		this.eventsHub.emit('basket:changed');
	}

	removeProduct(product: IProduct): void {
		this.products = this.products.filter((p) => p.id !== product.id);
		this.eventsHub.emit('basket:changed');
	}

	getProductById(id: string): IProduct | undefined {
		return this.products.find((p) => p.id === id);
	}

	clear(): void {
		this.products = [];
		this.eventsHub.emit('basket:changed');
	}

	get allIds(): string[] {
		return this.products.map((product) => product.id);
	}

	get total(): number {
		return this.products.length;
	}

	get totalPrice(): number {
		return this.products.reduce(
			(sum, product) => sum + (product.price ?? 0),
			0
		);
	}

	get all(): IProduct[] {
		return [...this.products];
	}
}
