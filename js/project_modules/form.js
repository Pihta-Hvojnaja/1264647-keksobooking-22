import {
  setMinPrice,
  correlateOptions,
  showMessageError,
  checkSelect,
  checkInput

} from './util.js';

import { sendData } from './api.js';
import { rollBackMap } from './map.js';
import { showNotice } from './notification.js';

const formFilter = document.querySelector('.map__filters');
const formAd = document.querySelector('.ad-form');
const formAdReset = formAd.querySelector('.ad-form__reset');

const inputTitleAd = formAd.querySelector('#title');

const selectTypeAd = formAd.querySelector('#type');
const inputPriceAd = formAd.querySelector('#price');

const selectTimeinAd = formAd.querySelector('#timein');
const selectTimeoutAd = formAd.querySelector('#timeout');

const selectRoomAd = formAd.querySelector('#room_number');
const selectCapacityAd = formAd.querySelector('#capacity');

//ОТПРАВКА, СБРОС ФОРМЫ
const resetFormMap = () => {
  formFilter.reset();
  formAd.reset();
  rollBackMap();
}

const onFormSend = () => {
  showNotice();
  resetFormMap();
};

const onFail = () => {
  showNotice('fail');
};

formAd.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => onFormSend(),
    () => onFail(),
    new FormData(evt.target),
  );
});

//Возвращаем карту к изначальному состоянию через reset
formAdReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetFormMap();
});


// ВАЛИДАЦИЯ ФОРМЫ
//Валидация заголовка объявления
checkInput(inputTitleAd);

//Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
setMinPrice(selectTypeAd, inputPriceAd);

selectTypeAd.addEventListener('change', () => {
  setMinPrice(selectTypeAd, inputPriceAd);
});

checkInput(inputPriceAd);

//Синхронизация полей «Время заезда» и «Время выезда»
correlateOptions(selectTimeinAd, selectTimeoutAd);

selectTimeinAd.addEventListener('change', () => {
  correlateOptions(selectTimeinAd, selectTimeoutAd);
});

selectTimeoutAd.addEventListener('change', () => {
  correlateOptions(selectTimeoutAd, selectTimeinAd);
});

//Синхронизация валидации полей «Количество комнат» и «Количество мест»
selectCapacityAd.value = '1';

selectRoomAd.addEventListener('change', () => {
  const quantityRooms = selectRoomAd.value;
  const quantityGuests = selectCapacityAd.value;

  selectRoomAd.style.boxShadow = 'none';

  showMessageError(quantityRooms, quantityGuests, selectCapacityAd);
  checkSelect(selectRoomAd, selectCapacityAd);
});

selectCapacityAd.addEventListener('change', () => {
  const quantityRooms = selectRoomAd.value;
  const quantityGuests = selectCapacityAd.value;

  selectCapacityAd.style.boxShadow = 'none';

  showMessageError(quantityRooms, quantityGuests, selectRoomAd);
  checkSelect(selectCapacityAd, selectRoomAd);
});
