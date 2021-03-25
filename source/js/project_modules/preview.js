import { resetError, showPreview } from './util.js';


/* Переменные
   ========================================================================== */

const AVATAR_DEFAULT_URL = 'img/muffin-grey.svg';
const TAG_IMG = '<img src="" width="70" height="70">';

//Поля загрузки для фото аватарки
const headerAdElement = document.querySelector('.ad-form-header');
const fileChooserAvatarElement = headerAdElement.querySelector('#avatar');
const previewAvatarElement = headerAdElement.querySelector('.ad-form-header__preview img');

//Поля загрузки для фото жилых помещений
const photoContainerElement = document.querySelector('.ad-form__photo-container');
const fileChooserHousingElement = photoContainerElement.querySelector('#images');
const previewContainerElement = photoContainerElement.querySelector('.ad-form__photo');
let previewHousingElement;


/* Функции
   ========================================================================== */

/**
 * Сброс состояния превью-полей
 */

const resetPreview = () => {
  previewAvatarElement.src = AVATAR_DEFAULT_URL;

  if (previewHousingElement) {
    previewContainerElement.removeChild(previewHousingElement);
  }

  resetError(fileChooserAvatarElement);
  resetError(fileChooserHousingElement);

  previewHousingElement = null;
};


/* Обработчики событий
   ========================================================================== */

/**
 * Превью аватарки
 */

fileChooserAvatarElement.addEventListener('change', () => {
  if (!showPreview(fileChooserAvatarElement, previewAvatarElement)) { //если превью не загружено, показать дефолтную картинку
    previewAvatarElement.src = AVATAR_DEFAULT_URL;
  }
});

/**
 * Превью жилых помещений
 */

fileChooserHousingElement.addEventListener('change', () => {

  if (!previewHousingElement) {
    previewContainerElement.insertAdjacentHTML('beforeend', TAG_IMG);
    previewHousingElement = photoContainerElement.querySelector('.ad-form__photo img');
  }

  if (!showPreview(fileChooserHousingElement, previewHousingElement)) {
    previewContainerElement.removeChild(previewHousingElement);
    previewHousingElement = null;
  }
});

export { resetPreview };
