import { Component } from '../base/component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

interface IFormState {
	valid: boolean;
	errors: string[];
}

export class FormView<T> extends Component<IFormState> {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

		const paymentButtons = this.container.querySelectorAll<HTMLButtonElement>(
			'button[name="card"], button[name="cash"]'
		);

		paymentButtons.forEach((btn) => {
			btn.addEventListener('click', () => {
				paymentButtons.forEach((b) => b.classList.remove('button_alt-active'));
				btn.classList.add('button_alt-active');
				this.onInputChange('payment' as keyof T, btn.name);
			});
		});

		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}

	protected onInputChange(field: keyof T, value: string) {
		console.log(`${this.container.name}.${String(field)}:change`);
		this.events.emit(`${this.container.name}.${String(field)}:change`, {
			field,
			value,
		});
	}

	private restartRadioButton(): void {
		const paymentButtons = this.container.querySelectorAll<HTMLButtonElement>(
			'button[name="card"], button[name="cash"]'
		);
		if (paymentButtons.length === 0) return;
		paymentButtons.forEach((btn) => {
			btn.classList.remove('button_alt-active');
		});
	}

		/**
	 * Полный сброс состояния формы, включая:
	 * - очистку всех полей (`input`, `select`, `radio`, `textarea`);
	 * - удаление визуальных состояний кнопок (например, способа оплаты);
	 * - очистку текста ошибок валидации.
	 *
	 * Использовать **только** при полном завершении работы с формой — например,
	 * после успешной отправки заказа или явного сброса пользователем.
	 *
	 * ❗ Не вызывать при частичном изменении данных — это приведёт к
	 * потере пользовательского ввода и рассинхронизации интерфейса.
	 */
	public reset(): void {
		this.events.emit('data:clear')
		this.container.reset();
		this.errors = '';
		this.restartRadioButton?.();
	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	set errors(value: string) {
		this.setText(this._errors, value);
	}
}
