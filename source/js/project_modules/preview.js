import { showPreview } from './util.js';


/* Переменные
   ========================================================================== */

const AVATAR_DEFAULT_URL = 'img/muffin-grey.svg';
const DELAY = 1000;
const TAG_IMG = '<img src="" width="70" height="70">';

//Поля загрузки для фото аватарки
const headerAd = document.querySelector('.ad-form-header');
const fileChooserAvatarAd = headerAd.querySelector('#avatar');
const previewAvatarAd = headerAd.querySelector('.ad-form-header__preview img');

//Поля загрузки для фото жилых помещений
const photoContainerAd = document.querySelector('.ad-form__photo-container');
const fileChooserHousingAd = photoContainerAd.querySelector('#images');
const previewHousingAd = photoContainerAd.querySelector('.ad-form__photo');
let photoHousingAd;


/* Функции
   ========================================================================== */

/**
 * Сброс состояния превью-полей
 */

const resetPreview = () => {
  previewAvatarAd.src = AVATAR_DEFAULT_URL;

  if (photoHousingAd) previewHousingAd.removeChild(photoHousingAd);
  photoHousingAd = null;
};


/* Обработчики событий
   ========================================================================== */

/**
 * Превью аватарки
 */

fileChooserAvatarAd.addEventListener('change', () => {
  if (!showPreview(fileChooserAvatarAd, previewAvatarAd, DELAY)) {
    previewAvatarAd.src = AVATAR_DEFAULT_URL;
  }
});

/**
 * Превью жилых помещений
 */

fileChooserHousingAd.addEventListener('change', () => {

  if (!photoHousingAd) {
    previewHousingAd.insertAdjacentHTML('beforeend', TAG_IMG);
    photoHousingAd = photoContainerAd.querySelector('.ad-form__photo img');
  }

  if (!showPreview(fileChooserHousingAd, photoHousingAd, DELAY)) {
    previewHousingAd.removeChild(photoHousingAd);
    photoHousingAd = null;
  }
});

export { resetPreview };
