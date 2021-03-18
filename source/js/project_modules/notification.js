import {
  isEscEvent
} from './util.js';

/* Переменные
   ========================================================================== */

const ALERT_SHOW_TIME = 5000;
const alertPlaceElement = document.querySelector('.map__canvas');

const noticePlaseElement = document.querySelector('main');

const noticeFailTemplateElement = document.querySelector('#error').content.querySelector('.error');
const noticeFailElement = noticeFailTemplateElement.cloneNode(true);

const noticeLuckTemplateElement = document.querySelector('#success').content.querySelector('.success');
const noticeLuckElement = noticeLuckTemplateElement.cloneNode(true);


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

  alertPlaceElement.append(messageContainer);

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

  (fail) ? notice = noticeFailElement : notice = noticeLuckElement;

  notice.style.zIndex = 10000;
  noticePlaseElement.append(notice);

  const removeListeners = () => {
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  const onDocumentClick = () => {
    notice.remove();
    removeListeners();
  };

  const onDocumentKeydown = (evt) => {

    if (isEscEvent(evt)) {
      notice.remove();
    }

    removeListeners();
  };

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { showAlert, showNotice }
