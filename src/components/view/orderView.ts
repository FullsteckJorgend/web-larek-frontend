import { ensureElement } from '../../utils/utils';
import { Component } from '../base/component';
import { IEvents } from '../base/events';

export class OrderView extends Component<unknown> {
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;
    protected eventsHub: IEvents

	constructor(container: HTMLElement, eventsHub: IEvents) {
		super(container);

        this.eventsHub = eventsHub
		this._button = ensureElement(
			'.order-success__close',
			container
		) as HTMLButtonElement;
		this._price = ensureElement('.order-success__description', container);

		this._button.addEventListener('click', () => {
            this.eventsHub.emit('order:end')
        });
	}

	set price(value: Number) {
        this.setText(this._price, `Списано ${value} синапсов`)
    }
}
