import {
  filterType,
  filterPrice,
  filterRoomsGuests,
  getCheckedValue,
  compareCheckedValue
} from './util.js';


/* Переменные
   ========================================================================== */

//форма фильтра
const formFilterElement = document.querySelector('.map__filters');
const formFilterElements = formFilterElement.querySelectorAll('.map__filter, .map__features');

//элементы формы фильтра
const typeElement = formFilterElement.querySelector('#housing-type');
const priceElement = formFilterElement.querySelector('#housing-price');
const roomsElement = formFilterElement.querySelector('#housing-rooms');
const guestsElement = formFilterElement.querySelector('#housing-guests');
const featuresElement = formFilterElement.querySelector('#housing-features');

/* Функции
   ========================================================================== */

/**
 * Деактивация-активация формы фильтра
 */

const deactivateFormFilter = (cb) => cb(formFilterElement, formFilterElements);

const activateFormFilter = (cb) => cb(formFilterElement, formFilterElements);

/**
 * Сброс формы фильтра
 */

const resetFormFilter = () => formFilterElement.reset();

/**
 * Ф-ция-обработчик изменений фильтра
 */

const onFormFilterChange = (cb) => {
  formFilterElement.addEventListener('change', () => cb());
};

/**
 * Ф-ция сравнения данных объявления с данными фильтра
 */

const compareAdAndFilter = (ad) => {

  //фильтрация "тип жилья"
  if (!filterType(typeElement.value, ad.offer.type)) {
    return false;
  }

  //фильтрация "цена"
  if (!filterPrice(priceElement.value, ad.offer.price)) {
    return false;
  }

  //фильтрация "кол-во комнат"
  if (!filterRoomsGuests(roomsElement.value, ad.offer.rooms)) {
    return false;
  }

  //фильтрация "кол-во гостей"
  if (!filterRoomsGuests(guestsElement.value, ad.offer.guests)) {
    return false;
  }

  //фильтрация "особенности"
  const resultCompare = compareCheckedValue(getCheckedValue(featuresElement), ad.offer.features);

  if (resultCompare === false) {
    return false;
  }

  return true;
};

export {
  resetFormFilter,
  deactivateFormFilter,
  activateFormFilter,
  compareAdAndFilter,
  onFormFilterChange
};
