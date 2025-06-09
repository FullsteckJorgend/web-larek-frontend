/* NOTICE */
/* This document serves as a controller within the project structure. */
/* Documentation will be updated progressively during development. */
/* All actions and changes in the project will be recorded in the README.md file. */
/* The primary language of the documentation is Russian, so the most accurate information is available in the Russian version. */
/* At the beginning of the project, preliminary data interfaces were defined. These may change in future updates, */
/* although the likelihood is low — unless significant changes occur on the backend side. */
/* Apologies for any inaccuracies or outdated information that may be present. */

/* ВНИМАНИЕ */
/* Данный документ выполняет функцию контроллера в структуре проекта. */
/* Документация будет дополняться по мере разработки. */
/* Все действия и изменения в проекте отражаются в файле README.md. */
/* Основной язык документации — русский, поэтому наиболее достоверной считается русскоязычная версия. */
/* В самом начале разработки были определены предварительные интерфейсы данных. Они могут изменяться в будущих обновлениях, */
/* однако вероятность этого невелика — за исключением случаев, когда произойдут изменения на стороне бэкенда. */
/* Приношу извинения, если в тексте присутствуют неточности или устаревшая информация. */


import './scss/styles.scss';
import { DataCard } from './components/model/card';
import { Product } from './types';
import { Basket } from './components/model/basket';
import { CardAPI } from './components/model/cardAPI';
import { Card } from './components/view/cardView';
import { cloneTemplate, ensureElement } from './utils/utils';

const container = cloneTemplate('#card-catalog') as HTMLElement;
const products = new Card(container);
const dataCard = new DataCard();
const apiCard = new CardAPI('https://larek-api.nomoreparties.co/api/weblarek')
const carsList = ensureElement('.gallery')

apiCard.getCardList().then((data) => {
  console.log(data);
  dataCard.addproductList = data.items;
  carsList.append( products.render(dataCard.getProduct(0)))


}).catch((error) => {
  console.error('Ошибка при получении списка товаров:', error);
});