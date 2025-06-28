import { ensureElement } from '../../utils/utils';
import { Component } from '../base/component';
import { IEvents } from '../base/events';

interface IBasketView {
	totalPrise: number | null;
}

export class BasketView extends Component<IBasketView> {
	private _totalPrise: HTMLElement;
	private _button: HTMLButtonElement;
	private eventsHub: IEvents;
	protected _basketList: HTMLElement;

	constructor(container: HTMLElement, eventsHub: IEvents) {
		super(container);

		this.eventsHub = eventsHub;
		this._basketList = ensureElement<HTMLElement>('.basket__list', container);
		this._totalPrise = ensureElement('.basket__price', container);
		this._button = ensureElement('.button', container) as HTMLButtonElement;

		this._button.addEventListener('click', () => {
			this.eventsHub.emit('order:open');
		});
	}

	set basket(items: HTMLElement[]) {
		this._basketList.replaceChildren(...items);
	}

	set orderButtonDisabled(value: boolean) {
		this.setDisabled(this._button, value);
	}

	set totalPrise(value: number | null) {
		this.setText(this._totalPrise, `${value} синапсов`);
	}
}
