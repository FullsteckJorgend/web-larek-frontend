import './scss/styles.scss';
import { DataCard } from './components/model/cardData';
import { ICard, IOrderRequest, IOrderResponse } from './types';
import { DataBasket } from './components/model/basketData';
import { CardAPI } from './components/model/cardAPI';
import { CardView } from './components/view/cardView';
import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { ModalView } from './components/view/modalView';
import { PageView } from './components/view/pageView';
import { BasketCardView } from './components/view/cardBasketView';
import { BasketView } from './components/view/basketView';
import { FormView } from './components/view/formView';
import { DataDekivery } from './components/model/deliveryData';
import { DataContact } from './components/model/contactData';
import { API_URL, CDN_URL } from './utils/constants';
import { OrderAPI } from './components/model/orderAPI';
import { OrderView } from './components/view/orderView';

// --- ИНИЦИАЛИЗАЦИЯ ---
const modalContainer = ensureElement('#modal-container');
const basketEl = ensureElement('.basket') as HTMLElement;
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const dekiveryFormElement = orderTemplate.content
	.querySelector('form')
	.cloneNode(true) as HTMLFormElement;
const contactsFormElement = contactsTemplate.content
	.querySelector('form')
	.cloneNode(true) as HTMLFormElement;
const successElement = successTemplate.content.cloneNode(true) as HTMLElement;

const eventsHub = new EventEmitter();
const orderAPI = new OrderAPI(API_URL);
const apiCard = new CardAPI(API_URL);
const dataCard = new DataCard(eventsHub);
const dataBasket = new DataBasket(eventsHub);
const viewModal = new ModalView(modalContainer, eventsHub);
const viewPage = new PageView(document.body, eventsHub);
const viewBasket = new BasketView(basketEl, eventsHub);

const viewFormDekivery = new FormView(dekiveryFormElement, eventsHub);
const viewFormContact = new FormView(contactsFormElement, eventsHub);

const dataDekivery = new DataDekivery(eventsHub);
const dataContact = new DataContact(eventsHub);

// --- ЗАГРУЗКА КАТАЛОГА ---
apiCard
	.getCardList()
	.then((data) => {
		const updatedItems = data.items.map((item) => ({
			...item,
			image: `https://larek-api.nomoreparties.co/content/weblarek${item.image}`,
		}));
		dataCard.productList = updatedItems;
	})
	.catch((error) => {
		console.error('Ошибка при получении списка товаров:', error);
	});

// --- РЕНДЕР КАТАЛОГА ---
eventsHub.on('cards:changed', () => {
	const cardElements = dataCard.all.map((product) => {
		const cardMini = new CardView(
			cloneTemplate('#card-catalog') as HTMLElement,
			eventsHub
		);
		const inBasket = !!dataBasket.getProductById(product.id);
		cardMini.button = !inBasket;
		return cardMini.render(product);
	});
	viewPage.catalog = cardElements;
});

// --- ОТКРЫТИЕ ПОЛНОЙ КАРТОЧКИ ---
eventsHub.on('cardFull:open', (id: { id: string }) => {
	const cardData = dataCard.getProductById(id.id);
	if (!cardData) return;
	const inBasket = !!dataBasket.getProductById(cardData.id);
	const cardFullData: ICard = { ...cardData, button: inBasket };
	const cardFullView = new CardView(
		cloneTemplate('#card-preview') as HTMLElement,
		eventsHub
	);
	const element = cardFullView.render(cardFullData);
	viewModal.render({ content: element });
	viewPage.locked = true;
});

// --- ОТКРЫТИЕ КОРЗИНЫ ---
eventsHub.on('basket:open', () => {
	const basketModalContent = basketEl.closest('.modal__content') as HTMLElement;
	if (basketModalContent) {
		viewModal.render({ content: basketModalContent });
		viewPage.locked = true;
	}
});

// --- ЗАКРЫТИЕ МОДАЛОК ---
eventsHub.on('button:close', () => {
	viewModal.close();
});

// --- ВКЛЮЧЕНИЕ СКРОЛЛ ---
eventsHub.on('modal:close', () => {
	viewPage.locked = false;
});

// --- ДОБАВЛЕНИЕ В КОРЗИНУ ---
eventsHub.on('basket:edit', (id: { id: string }) => {
	const product = dataCard.getProductById(id.id);
	if (!product) return;
	if (!dataBasket.getProductById(id.id)) {
		dataBasket.addProduct(product);
	}
	eventsHub.emit('cards:changed');
	eventsHub.emit('button:close');
});

// --- ОБНОВЛЕНИЕ СЧЁТЧИКА КОРЗИНЫ В ГЛАВНОМ МЕНЮ ---
eventsHub.on('basket:changed', () => {
	viewPage.totalCards = dataBasket.total;
});

// --- ОБНОВЛЕНИЕ СУММЫ ПРАЙСА И КНОПКИ ОФОРМЛЕНИЯ КОРЗИНЫ ---
eventsHub.on('basket:changed', () => {
	viewBasket.totalPrise = dataBasket.totalPrice;
	const hasNullPrice = dataBasket.all.some((product) => product.price === null);
	viewBasket.orderButtonDisabled = dataBasket.total === 0 || hasNullPrice;
});

// --- СОЗДАНИЯ КАРТОЧЕК КОРЗИНЫ ---
eventsHub.on('basket:changed', () => {
	const cardElements = dataBasket.all.map((data, index) => {
		const cardBasketView = new BasketCardView(
			cloneTemplate('#card-basket') as HTMLElement,
			eventsHub
		);
		const indexCard = index + 1;
		cardBasketView.numberCard = indexCard;
		return cardBasketView.render(data);
	});
	viewBasket.basket = cardElements;
});

// --- УДАЛЕНИЕ КАРТОЧЕК КОРЗИНЫ ---
eventsHub.on('basket:delete', (id: { id: string }) => {
	const remoteСard = dataBasket.getProductById(id.id);
	dataBasket.removeProduct(remoteСard);
});

// --- ОФОРМЛЕНИЕ ЗАКАЗА ---
eventsHub.on('order:open', () => {
	viewModal.render({ content: dekiveryFormElement });
	viewPage.locked = true;
});

eventsHub.on('order.payment:change', (d: { field: string; value: string }) => {
	dataDekivery.setPayment = d.value;
});

eventsHub.on('order.address:change', (d: { field: string; value: string }) => {
	dataDekivery.setAddress = d.value;
});

eventsHub.on('dekivery:changed', () => {
	const isValid = dataDekivery.validAddress() && dataDekivery.validPayment();
	viewFormDekivery.valid = isValid;
	viewFormDekivery.errors = isValid
		? ''
		: 'Введите адрес и выберите способ оплаты';
	viewFormDekivery.valid = isValid;
});

eventsHub.on('order:submit', () => {
	viewModal.render({ content: contactsFormElement });
	viewPage.locked = true;
});

eventsHub.on('contacts.email:change', (d: { field: string; value: string }) => {
	dataContact.setEmail = d.value;
});

eventsHub.on('contacts.phone:change', (d: { field: string; value: string }) => {
	dataContact.setPhone = d.value;
});

eventsHub.on('contacts:changed', () => {
	const isValid = dataContact.validEmail() && dataContact.validPhone();
	viewFormContact.valid = isValid;
	viewFormContact.errors = isValid ? '' : 'Введите email и номер телефона';
});

eventsHub.on('contacts:submit', () => {
	const server: IOrderRequest = {
		address: dataDekivery.address,
		payment: dataDekivery.payment as '' | 'card' | 'cash',
		email: dataContact.email,
		phone: dataContact.phone,
		items: dataBasket.allIds,
		total: dataBasket.totalPrice,
	};
	orderAPI
		.postOrder(server)
		.then((data: IOrderResponse) => {
			const successElement = successTemplate.content.cloneNode(
				true
			) as HTMLElement;
			const viewOrder = new OrderView(successElement, eventsHub);
			viewModal.render({
				content: successElement,
			});
			viewOrder.price = dataBasket.totalPrice;
			viewPage.locked = true;
			viewFormDekivery.reset();
			viewFormContact.reset();
		})
		.catch((error) => {
			console.error('Ошибка при отправки запроса:', error);
		});
});

eventsHub.on('data:clear', () => {
	dataBasket.clear();
	dataContact.clear();
	dataDekivery.clear();
});

eventsHub.on('order:end', () => {
	eventsHub.emit('button:close');
});
