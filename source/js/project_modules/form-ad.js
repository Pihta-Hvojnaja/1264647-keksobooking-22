import {
  checkInput,
  correlateOptions,
  resetError,
  rollBackStyle,
  setMinPrice,
  showMessageError,
  validateSelector
} from './util.js';

import { sendData } from './api.js';
import { showNotice } from './notification.js';
import { resetFormFilter } from './form-filter.js';
import { resetPreview } from './preview.js';


/* Переменные
   ========================================================================== */

const MESSAGE_ERROR_FORMAT_ADDRESS = 'Введите координаты в формате: 00.00000, 000.00000';

const formAdElement = document.querySelector('.ad-form');
const formAdElements = formAdElement.querySelectorAll('.ad-form-header, .ad-form__element');

//кнопка reset
const resetElement = formAdElement.querySelector('.ad-form__reset');

//поля и селекторы формы объявления
const titleElement = formAdElement.querySelector('#title');
const addressElement = formAdElement.querySelector('#address');

const typeElement = formAdElement.querySelector('#type');
const priceElement = formAdElement.querySelector('#price');

const timeElement = formAdElement.querySelector('#timein');
const timeoutElement = formAdElement.querySelector('#timeout');

const roomsElement = formAdElement.querySelector('#room_number');
const guestsElement = formAdElement.querySelector('#capacity');


/* Функции
   ========================================================================== */

/**
 * Деактивация-активация формы объявления
 */

const deactivateFormAd = (cb) => cb(formAdElement, formAdElements);

const activateFormAd = (cb) => cb(formAdElement, formAdElements);

/**
 * Блокируем адресную строку для редактирования
 */

const blockAddressInput = () => addressElement.readOnly = true;

/**
 * Получение адреса для поля "адрес" из map.js
 */

const getAddress = (marker) => {
  const source = marker.getLatLng();
  addressElement.value = (source.lat).toFixed(5) + ', '+ (source.lng).toFixed(5);
};

/**
 * Получаем ф-ции rollBackMap, createMarkersAds из map.js
 */

//получаем ф-цию rollBackMap из map.js для отката карты и маркера
let rollBackMap;
const passRollBackMap = (cb) => rollBackMap = cb;

//получаем ф-цию сreateMarkersAds из map.js для отката маркеров
let createMarkersAds;
const passCreateMarkersAds = (cb) => createMarkersAds = cb;

/**
 * Ф-ции отправки, сброса формы объявления и фильтра карты
 */

//ф-ция отката форм и карты к дефолту
const resetFormsAndMap = () => {
  resetFormFilter(); //откат фильтра
  formAdElement.reset(); //откат формы

  if (rollBackMap) {
    rollBackMap(); //откат карты и главного маркера
  }

  if (createMarkersAds) {
    createMarkersAds(); //откат маркеров похожих объявлений
  }

  resetPreview(); //сброс превью

  //откат стилей валидируемых полей
  rollBackStyle(titleElement); //поле "заголовок"
  rollBackStyle(priceElement); //поле "цена"
  rollBackStyle(roomsElement); //поле "комнаты"
  rollBackStyle(guestsElement); //поле "гости"
}

//ф-ция успешной отправки данных
const onFormSend = () => {
  showNotice();
  resetFormsAndMap();
};

//ф-ция при провале отправки
const onFail = () => showNotice('fail');


/* Отпрака и сброс формы
   ========================================================================== */

/**
 * Отправка данных формы
 */

formAdElement.addEventListener('submit', (evt) => {
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

resetElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetFormsAndMap();
});


/* Валидация формы
   ========================================================================== */

/**
 * Валидация заголовка объявления
 */

checkInput(titleElement);

/**
 * Валидация поля "адрес"
 */

if (addressElement.readOnly === false) {
  addressElement.addEventListener('input', () => {
    resetError(addressElement);
    addressElement.reportValidity();

    if (addressElement.validity.valid) {
      addressElement.style.boxShadow = '0 0 1px 0 #008000';

    } else {
      addressElement.setCustomValidity(MESSAGE_ERROR_FORMAT_ADDRESS);
      addressElement.style.boxShadow = null;
    }
  });
}

/**
 * Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
 */

setMinPrice(typeElement, priceElement);

typeElement.addEventListener('change', () => {
  setMinPrice(typeElement, priceElement);
});

checkInput(priceElement);

/**
 * Синхронизация полей «Время заезда» и «Время выезда»
 */

correlateOptions(timeElement, timeoutElement);

timeElement.addEventListener('change', () => {
  correlateOptions(timeElement, timeoutElement);
});

timeoutElement.addEventListener('change', () => {
  correlateOptions(timeoutElement, timeElement);
});

/**
 * Валидация полей "комнаты" и "гости"
 */

//комнаты
roomsElement.addEventListener('change', () => {

  roomsElement.style.boxShadow = 'none';

  const selectStatus = validateSelector(roomsElement.value, guestsElement.value, guestsElement)
  showMessageError(selectStatus, guestsElement, roomsElement);
});

//гости
guestsElement.addEventListener('change', () => {

  guestsElement.style.boxShadow = 'none';

  const selectStatus = validateSelector(roomsElement.value, guestsElement.value, roomsElement)
  showMessageError(selectStatus, roomsElement, guestsElement);
});

export {
  activateFormAd,
  blockAddressInput,
  deactivateFormAd,
  getAddress,
  passCreateMarkersAds,
  passRollBackMap
};
