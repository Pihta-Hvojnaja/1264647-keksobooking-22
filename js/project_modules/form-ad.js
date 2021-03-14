import {
  setMinPrice,
  correlateOptions,
  validateSelector,
  switchMessageError,
  checkInput,
  rollbackStyle
} from './util.js';

import { sendData } from './api.js';
import { showNotice } from './notification.js';
import { resetFormFilter } from './form-filter.js';
import { resetPreview } from './preview.js';


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

//получаем ф-цию rollBackMap из map.js для отката карты и маркера
let rollBackMap;
const passRollBackMap = (cb) => {
  rollBackMap = cb;
};

//получаем ф-цию сreateMarkersAds из map.js для отката маркеров
let createMarkersAds;
const passСreateMarkersAds = (cb) => {
  createMarkersAds = cb;
}

//ф-ция отката форм и карты к дефолту
const resetFormsAndMap = () => {
  resetFormFilter(); //откат фильтра
  formAd.reset(); //откат формы
  rollBackMap(); //откат карты и главного маркера
  createMarkersAds(); //откат маркеров похожих объявлений
  resetPreview(); //сброс превью

  //откат стилей валидируемых полей
  rollbackStyle(inputTitleAd); //поле "заголовок"
  rollbackStyle(inputPriceAd); //поле "цена"
  rollbackStyle(selectRoomAd); //поле "комнаты"
  rollbackStyle(selectCapacityAd); //поле "гости"
}

//ф-ция успешной отправки данных
const onFormSend = () => {
  showNotice();
  resetFormsAndMap();
};

//ф-ция при провале отправки
const onFail = () => {
  showNotice('fail');
};


/* Блокируем адресную строку для редактирования
   ========================================================================== */

addressAd.readOnly = true;


/* Отпрака и сброс формы
   ========================================================================== */

/**
 * Отправка данных формы
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

  const selectStatus = validateSelector(selectRoomAd.value, selectCapacityAd.value, selectCapacityAd)
  switchMessageError(selectStatus, selectCapacityAd, selectRoomAd);
});

//гости
selectCapacityAd.addEventListener('change', () => {

  selectCapacityAd.style.boxShadow = 'none';

  const selectStatus = validateSelector(selectRoomAd.value, selectCapacityAd.value, selectRoomAd)
  switchMessageError(selectStatus, selectRoomAd, selectCapacityAd);
});

export {
  passRollBackMap,
  passСreateMarkersAds,
  activatingFormAd,
  deactivatingFormAd,
  getAddress
};
