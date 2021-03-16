import {
  hideElement,
  addInnerElements,
  compareTypes
} from './util.js';


/* Переменные
   ========================================================================== */

const mapPopupTemplate = document.querySelector('#card').content.querySelector('.popup');


/* Функции
   ========================================================================== */

/**
 * Ф-ция создания объявления
 */

const createPopup = (ad) => {
  const mapPopup = mapPopupTemplate.cloneNode(true);
  let element;

  //Аватарка
  element = mapPopup.querySelector('.popup__avatar');
  if (ad.author.avatar) {
    element.src = ad.author.avatar;
  } else {
    hideElement(element);
  }

  //Заголовок
  element = mapPopup.querySelector('.popup__title');
  if (ad.offer.title) {
    element.textContent = ad.offer.title;
  } else {
    hideElement(element);
  }

  //Адрес
  element = mapPopup.querySelector('.popup__text--address');
  if (ad.offer.address) {
    element.textContent = ad.offer.address;
  } else {
    hideElement(element);
  }

  //Цена
  element = mapPopup.querySelector('.popup__text--price');
  if (ad.offer.price || ad.offer.price === 0) {
    element.innerHTML = `${ad.offer.price} <span>₽/ночь</span>`;
  } else {
    hideElement(element);
  }

  //Тип жилья
  element = mapPopup.querySelector('.popup__type');
  if (ad.offer.type) {
    element.textContent = compareTypes(ad.offer.type);
  } else {
    hideElement(element);
  }

  //Вместимость жилья
  element = mapPopup.querySelector('.popup__text--capacity');

  if ((ad.offer.rooms || ad.offer.rooms === 0) &&
      (ad.offer.guests || ad.offer.guests === 0)) {

    element.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  } else {
    hideElement(element);
  }

  //Время аренды
  element = mapPopup.querySelector('.popup__text--time');
  if (ad.offer.checkin && ad.offer.checkout) {
    element.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  } else {
    hideElement(element);
  }

  //Описание жилья
  element = mapPopup.querySelector('.popup__description');
  if (ad.offer.description) {
    element.textContent = ad.offer.description;
  } else {
    hideElement(element);
  }

  //Фичи
  addInnerElements(mapPopup.querySelector('.popup__features'), ad.offer.features, 'li');

  //Фотографии жилья
  addInnerElements(mapPopup.querySelector('.popup__photos'), ad.offer.photos, 'img');

  return mapPopup;
};

export { createPopup };
