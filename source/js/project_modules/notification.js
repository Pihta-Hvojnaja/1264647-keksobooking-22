import {
  isClickEvent,
  isEscEvent
} from './util.js';

/* Переменные
   ========================================================================== */

const ALERT_SHOW_TIME = 5000;
const alertPlace = document.querySelector('.map__canvas');

const noticePlase = document.querySelector('main');

const noticeFailTemplate = document.querySelector('#error').content.querySelector('.error');
const noticeFail = noticeFailTemplate.cloneNode(true);

const noticeLuckTemplate = document.querySelector('#success').content.querySelector('.success');
const noticeLuck = noticeLuckTemplate.cloneNode(true);


/* Функции
   ========================================================================== */

/**
 * Ошибка запроса данных
 */

const showAlert = (message) => {
  const messageContainer = document.createElement('div');
  messageContainer.style.position = 'absolute';
  messageContainer.style.zIndex = 10000;
  messageContainer.style.top = 0;
  messageContainer.style.right = 0;
  messageContainer.style.left = 0;
  messageContainer.style.padding = '20px 50px';
  messageContainer.style.textAlign = 'center';
  messageContainer.style.fontSize = '30px';
  messageContainer.style.fontWeight = '700';
  messageContainer.style.color = '#ffffff';
  messageContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';

  messageContainer.textContent = message;

  alertPlace.append(messageContainer);

  setTimeout(
    () => messageContainer.remove(),

    ALERT_SHOW_TIME,
  );
};

/**
 * Сообщение об отправке или неотправке данных
 */

const showNotice = (fail) => {
  let notice;

  (fail) ? notice = noticeFail : notice = noticeLuck;

  notice.style.zIndex = 10000;
  noticePlase.append(notice);

  const closeNotice = (evt) => {

    if (isClickEvent(evt) || isEscEvent(evt)) {
      notice.remove();
    }

    document.removeEventListener('keydown', closeNotice);
    document.removeEventListener('click', closeNotice);
  };

  document.addEventListener('click', closeNotice);
  document.addEventListener('keydown', closeNotice);
};

export { showAlert, showNotice }
