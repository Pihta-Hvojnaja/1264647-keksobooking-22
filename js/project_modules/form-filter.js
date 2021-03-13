import {
  getCheckedCheckBoxes,
  compareCheckedValue
} from './util.js';


/* Переменные
   ========================================================================== */

const formFilter = document.querySelector('.map__filters');
const formFilterElements = formFilter.querySelectorAll('.map__filter, .map__features');

const housingTypeFilter = formFilter.querySelector('#housing-type');
const housingPriceFilter = formFilter.querySelector('#housing-price');
const housingRoomsFilter = formFilter.querySelector('#housing-rooms');
const housingGuestsFilter = formFilter.querySelector('#housing-guests');
const housingFeaturesFilter = formFilter.querySelector('#housing-features');

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
 * Ф-ции обработчиков изменений фильтров
 */

const addHandlerChange = (cb) => {
  //обработчик "тип жилья"
  housingTypeFilter.addEventListener('change', () => {
    cb();
  });
  //обработчик "цена за ночь"
  housingPriceFilter.addEventListener('change', () => {
    cb();
  });
  //обработчик "кол-во комнат"
  housingRoomsFilter.addEventListener('change', () => {
    cb();
  });
  //обработчик "кол-во гостей"
  housingGuestsFilter.addEventListener('change', () => {
    cb();
  });
  //обработчик чекбоксов "особенности жилья"
  housingFeaturesFilter.addEventListener('change', () => {
    cb();
  });
};

/**
 * Ф-ция сравнения данных объявления с данными фильтра
 */

const compareAdAndFilter = (ad) => {
  //сравнение с фильтром "тип жилья"
  let valueSelect = housingTypeFilter.value;
  let valueAd = ad.offer.type;
  if (valueSelect !== valueAd && valueSelect !== 'any') {
    return false;
  }
  //сравнение с фильтром "цена"
  valueSelect = housingPriceFilter.value;
  valueAd = ad.offer.price;
  if (valueSelect !== 'any') {
    if (valueSelect === 'low' && valueAd > 10000) {
      return false;
    }

    if (valueSelect === 'middle' && (valueAd <= 10000 || valueAd >= 50000)) {
      return false;
    }

    if (valueSelect === 'high' && valueAd < 50000) {
      return false;
    }
  }
  //сравнение с фильтром "кол-во комнат"
  valueSelect = housingRoomsFilter.value;
  valueAd = ad.offer.rooms + '';
  if (valueSelect !== valueAd && valueSelect !== 'any') {
    return false;
  }
  //сравнение с фильтром "кол-во гостей"
  valueSelect = housingGuestsFilter.value;
  valueAd = ad.offer.guests + '';
  if (valueSelect !== valueAd && valueSelect !== 'any') {
    return false;
  }
  //сравнение с чекбоксами "особенности"
  const checkedValues = getCheckedCheckBoxes(housingFeaturesFilter);
  if (compareCheckedValue(checkedValues, ad.offer.features) === false) {
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
