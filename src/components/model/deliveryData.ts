import { IEvents } from "../base/events";

export class DataDekivery {
	protected _address: string;
	protected _payment: string;
	protected eventHub: IEvents;

	constructor(eventHub: IEvents) {
		this.eventHub = eventHub;
		this._address = '';
		this._payment = '';
	}

	get address() {
		return this._address;
	}

	get payment() {
		return this._payment;
	}

	set setAddress(value: string) {
		this._address = value;
		this.eventHub.emit('dekivery:changed');
	}

	set setPayment(value: string) {
		this._payment = value;
		this.eventHub.emit('dekivery:changed');
	}

	validAddress() {
		return this._address.length > 0;
	}

	validPayment() {
		return this._payment.length > 0;
	}

	clear(): void {
		this._address = '';
		this._payment = '';
		this.eventHub.emit('dekivery:changed');
	}
}
