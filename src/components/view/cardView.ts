import { Component } from '../base/component';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { ICard } from '../../types';

export class CardView extends Component<ICard> {
	// data to display on the interface
	private _title: HTMLElement;
	private _image: HTMLImageElement;
	private _category: HTMLElement;
	private _price: HTMLElement;
	private _button?: HTMLButtonElement;
	private _description?: HTMLElement;
	private _id: string;
	//data for internal implementation
	private eventsHub: IEvents;
	private _buttonHandler?: EventListener;
	private static readonly CATEGORY_CLASSES: Record<string, string> = {
		'софт-скил': 'soft',
		'другое': 'other',
		'дополнительное': 'additional',
		'кнопка': 'button',
		'хард-скил': 'hard',
	};

	constructor(container: HTMLElement, eventsHub: IEvents) {
		super(container);
		/*data to display on the interface*/
		this._title = ensureElement('.card__title', this.container);
		this._image = ensureElement('.card__image', this.container) as HTMLImageElement;
		this._category = ensureElement('.card__category', this.container);
		this._price = ensureElement('.card__price', this.container);
		this._button = this.container.querySelector('.card__button-basket') as HTMLButtonElement;
		this._description = this.container.querySelector('.card__text');
		/*data for internal implementation*/
		this.eventsHub = eventsHub;
		this._buttonHandler = () => {
			this.eventsHub.emit('basket:edit', { id: this._id })
		}

		if (this._button) {
			const clone = this._button.cloneNode(true) as HTMLButtonElement;
			this._button.replaceWith(clone);
			this._button = clone;
			this._button.addEventListener('click', this._buttonHandler);
		} else {
			if (this.container instanceof HTMLButtonElement) {
				this.container.addEventListener('click', () =>
					this.eventsHub.emit('cardFull:open', { id: this._id })
				);
			}
		}
	}

	private updateCategoryClass(value: string): void {
		const baseClass = 'card__category_';
		const classMap = CardView.CATEGORY_CLASSES;

		Object.values(classMap).forEach((cls) => {
			this._category.classList.remove(baseClass + cls);
		});

		const className = classMap[value];
		if (className) {
			this._category.classList.add(baseClass + className);
		} else {
			console.warn(`Неизвестная категория: ${value}`);
		}
	}

	set id(value: string) {
		this._id = value;
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set image(value: string) {
		this.setImage(this._image, value, this._title.textContent || '');
	}

	set category(value: string) {
		this.setText(this._category, value);
		this.updateCategoryClass(value);
	}

	set price(value: number | null) {
		this.setText(
			this._price,
			value !== null ? `${value} синапсов` : 'бесценно'
		);
	}

	set description(value: string) {
		if (this._description) {
			this.setText(this._description, value);
		}
	}

	set button(value: boolean) {
		if (this._button) {
			if (!value) {
				this.setDisabled(this._button, value)
				this.setText(this._button, 'В корзину');
			} else {
				this.setDisabled(this._button, value)
				this.setText(this._button, 'В корзине');
			}
		}
	}
}
