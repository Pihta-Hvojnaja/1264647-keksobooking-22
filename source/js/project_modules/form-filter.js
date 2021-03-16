import {
  filterType,
  filterPrice,
  filterRoomsGuests,
  getCheckedValue,
  compareCheckedValue
} from './util.js';


/* Переменные
   ========================================================================== */

const formFilter = document.querySelector('.map__filters');
const formFilterElements = formFilter.querySelectorAll('.map__filter, .map__features');

const typeFilter = formFilter.querySelector('#housing-type');
const priceFilter = formFilter.querySelector('#housing-price');
const roomsFilter = formFilter.querySelector('#housing-rooms');
const guestsFilter = formFilter.querySelector('#housing-guests');
const featuresFilter = formFilter.querySelector('#housing-features');

/* Функции
   ========================================================================== */

/**
 * Деактивация-активация формы фильтра
 */

const deactivatingFormFilter = (cb) => {
  cb(formFilter, formFilterElements);
};

const activatingFormFilter = (cb) => {
  cb(formFilter, formFilterElements);
};

/**
 * Сброс формы фильтра
 */

const resetFormFilter = () => formFilter.reset();

/**
 * Ф-ция-обработчик изменений фильтра
 */

const addHandlerChange = (cb) => {
  formFilter.addEventListener('change', () => {
    cb();
  });
};

/**
 * Ф-ция сравнения данных объявления с данными фильтра
 */

const compareAdAndFilter = (ad) => {

  //фильтрация "тип жилья"
  if (!filterType(typeFilter.value, ad.offer.type)) {
    return false;
  }

  //фильтрация "цена"
  if (!filterPrice(priceFilter.value, ad.offer.price)) {
    return false;
  }

  //фильтрация "кол-во комнат"
  if (!filterRoomsGuests(roomsFilter.value, ad.offer.rooms)) {
    return false;
  }

  //фильтрация "кол-во гостей"
  if (!filterRoomsGuests(guestsFilter.value, ad.offer.guests)) {
    return false;
  }

  //фильтрация "особенности"
  const resultCompare = compareCheckedValue(getCheckedValue(featuresFilter), ad.offer.features);

  if (resultCompare === false) {
    return false;
  }

  return true;
};

export {
  resetFormFilter,
  deactivatingFormFilter,
  activatingFormFilter,
  compareAdAndFilter,
  addHandlerChange
};
