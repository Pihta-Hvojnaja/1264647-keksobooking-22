import { getData } from './api.js';

import {
  disableElements,
  enableElements,
  getAddress
} from './util.js';

import { showAlert } from './notification.js';
import { createPopup } from './popup.js';

/* global L:readonly */
const AD_QUANTITY = 10;
const [TOKYO_LAT, TOKYO_LNG] = [35.6895, 139.692];
const TOKYO_ZOOM = 10;

const MAIN_ICON_URL = '../img/main-pin.svg';
const MAIN_ICON_SIZES = [50, 82];
const MAIN_ANCHOR_SIZES = [25, 82];

const [MAIN_MARKER_LAT, MAIN_MARKER_LNG] = [35.6895, 139.692];

const ICON_URL = '../img/pin.svg';
const ICON_SIZES = [25, 41];
const ANCHOR_SIZES = [12.5, 41];

const formMap = document.querySelector('.map__filters');
const formMapElements = formMap.querySelectorAll('.map__filter, .map__features');

const formAd = document.querySelector('.ad-form');
const formAdElements = formAd.querySelectorAll('.ad-form-header, .ad-form__element');

const addressAd = formAd.querySelector('#address');

//Создаем маркеры и балуны
const mainIcon = L.icon({
  iconUrl: MAIN_ICON_URL,
  iconSize: MAIN_ICON_SIZES,
  iconAnchor: MAIN_ANCHOR_SIZES,
});

const mainMarker = L.marker(
  {
    lat: MAIN_MARKER_LAT,
    lng: MAIN_MARKER_LNG,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

const createMarkersAds = (ads) => {

  ads.forEach((ad) => {

    const markerIcon = L.icon({
      iconUrl: ICON_URL,
      iconSize: ICON_SIZES,
      iconAnchor: ANCHOR_SIZES,
    });

    const marker = L.marker(
      {
        lat: ad.location.lat,
        lng: ad.location.lng,
      },
      {
        icon: markerIcon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(createPopup(ad));
  });
};

const rollBackMap = () => {
  map.setView([TOKYO_LAT, TOKYO_LNG]);
  mainMarker.setLatLng([MAIN_MARKER_LAT, MAIN_MARKER_LNG]);
};


//Деактивация фильтра карты и формы заполнения объявления
disableElements(formMap, formMapElements);
disableElements(formAd, formAdElements);


//Иницилизация карты, фильтра карты и формы заполнения объявления
const map = L.map('map-canvas')
  .setView({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,

  }, TOKYO_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map)
  .on('load', () => {
    mainMarker.addTo(map);

    getData(
      (ads) => createMarkersAds(ads.slice(0, AD_QUANTITY)),

      () => showAlert('Не удалось загрузить похожие объявления!'),
    );

    enableElements(formMap, formMapElements);
    enableElements(formAd, formAdElements);
  });


//Блокируем поле адресс для редактирования, передаем в него координаты меток
addressAd.readOnly = true;
getAddress(mainMarker, addressAd);
mainMarker.on('move', (evt) => getAddress(evt.target, addressAd));

export { rollBackMap };
