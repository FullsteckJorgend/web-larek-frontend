import { IProductBasket } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/component";
import { IEvents } from "../base/events";

export class BasketCardView extends Component<IProductBasket> {
    private _numberCard: HTMLElement;
    private _title: HTMLElement;
    private _price: HTMLElement

    private _id: string;
    private _deleteCardButton: HTMLButtonElement;
    eventHub: IEvents;

    constructor(container: HTMLElement, eventHub: IEvents) {
        super(container)

        this._numberCard = ensureElement(".basket__item-index", container)
        this._price = ensureElement(".card__price", container)
        this._title = ensureElement(".card__title", container)

        this._deleteCardButton = ensureElement(".basket__item-delete", container) as HTMLButtonElement
        this._deleteCardButton.addEventListener("click", () => {
            eventHub.emit("basket:delete", { id: this._id })
        })
    }

  	set id(value: string) {
		this._id = value;
	}

    set title(value: string) {
        this.setText(this._title, value);
    }

    set price(value: number | null) {
        this.setText(
            this._price,
            value !== null ? `${value} синапсов` : 'бесценно'
        );
    }

    set numberCard(value: number) {
        this.setText(this._numberCard, value);
    }
}