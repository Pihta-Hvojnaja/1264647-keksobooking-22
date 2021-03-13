import {
  setMinPrice,
  correlateOptions,
  showMessageError,
  checkSelect,
  checkInput
} from './util.js';

import { sendData } from './api.js';
import { showNotice } from './notification.js';
import { resetFormFilter } from './form-filter.js';


/* Переменные
   ========================================================================== */

const formAd = document.querySelector('.ad-form');
const formAdElements = formAd.querySelectorAll('.ad-form-header, .ad-form__element');

const formAdReset = formAd.querySelector('.ad-form__reset');

const inputTitleAd = formAd.querySelector('#title');
const addressAd = formAd.querySelector('#address');

const selectTypeAd = formAd.querySelector('#type');
const inputPriceAd = formAd.querySelector('#price');

const selectTimeinAd = formAd.querySelector('#timein');
const selectTimeoutAd = formAd.querySelector('#timeout');

const selectRoomAd = formAd.querySelector('#room_number');
const selectCapacityAd = formAd.querySelector('#capacity');

let rollBackMap;


/* Функции
   ========================================================================== */

/**
 * Деактивация-активация формы объявления
 */

const deactivatingFormAd = (cb) => {
  cb(formAd, formAdElements);
};

const activatingFormAd = (cb) => {
  cb(formAd, formAdElements);
};

/**
 * Получение адреса для поля "адрес"
 */

const getAddress = (marker) => {
  const source = marker.getLatLng();
  addressAd.value = (source.lat).toFixed(5) + ', '+ (source.lng).toFixed(5);
};

/**
 * Ф-ции отправки, сброса формы объявления и фильтра карты
 */

const passRollBackMap = (passedFunction) => {
  rollBackMap = passedFunction;
};

const resetFormsAndMap = () => {
  resetFormFilter();
  formAd.reset();
  rollBackMap();
}

const onFormSend = () => {
  showNotice();
  resetFormsAndMap();
};

const onFail = () => {
  showNotice('fail');
};


/* Блокируем адресную строку для редактирования
   ========================================================================== */

addressAd.readOnly = true;


/* Отпрака и сброс формы
   ========================================================================== */

/**
 * Отправляем данные формы
 */

formAd.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => onFormSend(),
    () => onFail(),
    new FormData(evt.target),
  );
});

/**
 * Возвращаем карту к изначальному состоянию через reset
 */

formAdReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetFormsAndMap();
});


/* Валидация формы
   ========================================================================== */

/**
 * Валидация заголовка объявления
 */

checkInput(inputTitleAd);

/**
 * Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
 */

setMinPrice(selectTypeAd, inputPriceAd);

selectTypeAd.addEventListener('change', () => {
  setMinPrice(selectTypeAd, inputPriceAd);
});

checkInput(inputPriceAd);

/**
 * Синхронизация полей «Время заезда» и «Время выезда»
 */

correlateOptions(selectTimeinAd, selectTimeoutAd);

selectTimeinAd.addEventListener('change', () => {
  correlateOptions(selectTimeinAd, selectTimeoutAd);
});

selectTimeoutAd.addEventListener('change', () => {
  correlateOptions(selectTimeoutAd, selectTimeinAd);
});

/**
 * Валидация полей "комнаты" и "гости"
 */

//комнаты
selectRoomAd.addEventListener('change', () => {

  selectRoomAd.style.boxShadow = 'none';

  showMessageError(selectRoomAd.value, selectCapacityAd.value, selectCapacityAd);
  checkSelect(selectRoomAd, selectCapacityAd);
});

//гости
selectCapacityAd.addEventListener('change', () => {

  selectCapacityAd.style.boxShadow = 'none';

  showMessageError(selectRoomAd.value, selectCapacityAd.value, selectRoomAd);
  checkSelect(selectCapacityAd, selectRoomAd);
});

export {
  passRollBackMap,
  activatingFormAd,
  deactivatingFormAd,
  getAddress
};
