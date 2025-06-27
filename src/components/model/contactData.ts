import { IEvents } from '../base/events';

export class DataContact {
	protected _email: string;
	protected _phone: string;
	protected eventHub: IEvents;

	constructor(eventHub: IEvents) {
		this.eventHub = eventHub;
		this._email = '';
		this._phone = '';
	}

	get email() {
		return this._email;
	}

	get phone() {
		return this._phone;
	}

	set setEmail(value: string) {
		this._email = value;
		this.eventHub.emit('contacts:changed');
	}

	set setPhone(value: string) {
		this._phone = value;
		this.eventHub.emit('contacts:changed');
	}

	validEmail() {
		return this._email.length > 0;
	}

	validPhone() {
		return this._phone.length > 0;
	}

	clear(): void {
		this._email = '';
		this._phone = '';
		this.eventHub.emit('contacts:changed');
	}
}
