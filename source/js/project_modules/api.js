
/* Переменные
   ========================================================================== */

const URL_GET_DATA = 'https://22.javascript.pages.academy/keksobooking/data';
const URL_SEND_DATA = 'https://22.javascript.pages.academy/keksobooking';


/* Функции
   ========================================================================== */

/**
 * Ф-ция получения данных
 */

const getData = (onSuccess, onFail) => {
  fetch(URL_GET_DATA)
    .then((response) => {

      if (!response.ok) {
        throw true;
      }

      return response.json()
    })
    .then((ads) => onSuccess(ads))
    .catch(() => onFail());
};

/**
 * Ф-ция отправки данных
 */

const sendData = (onSuccess, onFail, body) => {
  fetch(
    URL_SEND_DATA,
    {
      method: 'POST',
      body,
    },
  ).
    then((response) => {
      if (!response.ok) {
        throw true;
      }
      onSuccess();
    })
    .catch(() => onFail());
};

export { getData, sendData };
