import {
  compareCheckedValue,
  filterPrice,
  filterRoomsGuests,
  filterType,
  getCheckedValue
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
  return filterType(typeElement.value, ad.offer.type) && //фильтрация "тип жилья"
         filterPrice(priceElement.value, ad.offer.price) && //фильтрация "цена"
         filterRoomsGuests(roomsElement.value, ad.offer.rooms) && //фильтрация "кол-во комнат"
         filterRoomsGuests(guestsElement.value, ad.offer.guests) && //фильтрация "кол-во гостей"
         compareCheckedValue(getCheckedValue(featuresElement), ad.offer.features); //фильтрация "особенности"
};

export {
  activateFormFilter,
  compareAdAndFilter,
  deactivateFormFilter,
  onFormFilterChange,
  resetFormFilter
};
