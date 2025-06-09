import { Product } from "../../types";
import { Component } from "../base/component";
import { ensureElement } from "../../utils/utils";

interface ICard extends Product {
    button: boolean; // Кнопка для добавления в корзину
}

export class Card extends Component<ICard> {
    private _id: string;               // Уникальный идентификатор товара
    private _title: HTMLElement;            // Название товара
    private _description: HTMLElement;      // Описание
    private _image: HTMLImageElement;            // Путь к изображению
    private _category: HTMLElement;         // Категория товара
    private _price: HTMLElement;
    private _button: HTMLButtonElement;          // Кнопка для добавления в корзину

    constructor(container: HTMLElement) {
        super(container)
        this._id = '';
        this._title = ensureElement(".card__title", this.container);
        this._description = ensureElement(".card__text", this.container);
        this._image = ensureElement(".card__image", this.container) as HTMLImageElement;
        this._category = ensureElement(".card__category", this.container);
        this._price = ensureElement(".card__price", this.container);
        this._button = ensureElement(".card__button", this.container) as HTMLButtonElement;
}

    set title(value: string) {
        this.setText(this._title, value)
    }

    set description(value: string) {
        this.setText(this._description, value);
    }

    set image(value: string) {
        this.setImage(this._image, value, this._title.textContent || ''); // Используем название товара как alt
    }

    set category(value: string) {
        this.setText(this._category, value);
    }

    set price(value: number | null) {
        if (value !== null) {
            this.setText(this._price, `${value} синапсов`);
        } else {
            this.setText(this._price, 'бесценно');
        }
    }

    set button(value: boolean) {
        if (value) {
            this.setText(this._button, 'В корзину');
            this.setDisabled(this._button, false);
        } else {
            this.setText(this._button, 'В корзине');
            this.setDisabled(this._button, true);
        }
    }
    
    
}

	// <template id="card-preview">
	// 	<div class="card card_full">
	// 		<img class="card__image" src="<%=require('../images/Subtract.svg')%>" alt="" />
	// 		<div class="card__column">
	// 			<span class="card__category card__category_other">другое</span>
	// 			<h2 class="card__title">Бэкенд-антистресс</h2>
	// 			<p class="card__text">Если планируете решать задачи в тренажёре, берите два.</p>
	// 			<div class="card__row">
	// 				<button class="button card__button">В корзину</button>
	// 				<span class="card__price">1000 синапсов</span>
	// 			</div>
	// 		</div>
	// 	</div>
	// </template> 