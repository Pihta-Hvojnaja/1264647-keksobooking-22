import { compareTypes } from './util.js';

const mapPopupTemplate = document.querySelector('#card').content.querySelector('.popup');

const hideElement = (item) => item.classList.add('hidden');

const addInnerElements = (parent, items, htmlTag) => {
  if (items.length === 0) {
    return hideElement(parent);
  }

  parent.innerHTML = '';

  items.forEach((item) => {
    let childTag;

    if (htmlTag === 'li') {
      childTag = `<li class="popup__feature popup__feature--${item}"></li>`;
    }

    if (htmlTag === 'img') {
      childTag = `<img src="${item}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
    }

    parent.insertAdjacentHTML('beforeend', childTag);
  });
}

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
  if (ad.offer.rooms && ad.offer.guests || ad.offer.guests === 0) {
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
