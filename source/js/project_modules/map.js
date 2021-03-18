import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { getData } from './api.js';

import {
  disableElements,
  enableElements,
  debounce
} from './util.js';

import {
  deactivateFormFilter,
  activateFormFilter,
  compareAdAndFilter,
  onFormFilterChange
} from './form-filter.js';

import {
  passRollBackMap,
  passCreateMarkersAds,
  deactivateFormAd,
  activateFormAd,
  blockAddressInput,
  getAddress

} from './form-ad.js';

import { showAlert } from './notification.js';
import { createPopup } from './popup.js';


/* Переменные
   ========================================================================== */

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

const RERENDER_DELAY = 500;


/* Функции
   ========================================================================== */

/**
 * Создает маркеры и балуны похожих объявлений
 */

let groupMarkers;

const createMarkersAds = (ads) => {
  const markers = [];

  ads.forEach((ad) => {

    if (compareAdAndFilter(ad)) {
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

      marker.bindPopup(createPopup(ad));
      markers.push(marker);
    }
  });

  if (groupMarkers) {
    groupMarkers.clearLayers();
  }

  groupMarkers = L.featureGroup(markers.slice(0, AD_QUANTITY)).addTo(map);

};

/**
 * возвращает главную метку в дефолтную позицию
 */

const rollBackMap = () => {
  map.setView([TOKYO_LAT, TOKYO_LNG]);
  mainMarker.setLatLng([MAIN_MARKER_LAT, MAIN_MARKER_LNG]);
};

/**
 * Отрисовывает метки похожих объявлений, активирует формы
 */

const onMapLoad = () => {
  mainMarker.addTo(map);

  //блокируем поле адрес для редактирования
  blockAddressInput();

  //получаем данные объявлений и создаем метки объявлений
  getData(
    (ads) => {
      //создание меток похожих объявлений
      createMarkersAds(ads);
      //обработчик изменений фильтра
      onFormFilterChange(
        debounce(
          () => createMarkersAds(ads),

          RERENDER_DELAY,
        ),
      );
      //активация фильтра карты
      activateFormFilter(
        (parent, children) => enableElements(parent, children),
      );
      //передаем ф-цию createMarkersAds в form-ad.js для сброса меток
      passCreateMarkersAds(() => createMarkersAds(ads));
    },

    () => showAlert('Не удалось загрузить похожие объявления!'),
  );

  //отдаем ф-цию rollBackMap в form-ad.js
  passRollBackMap(() => rollBackMap());
};


/* Деактивация фильтра карты и формы заполнения объявления
   ========================================================================== */

deactivateFormFilter(
  (parent, children) => disableElements(parent, children),
);

deactivateFormAd(
  (parent, children) => disableElements(parent, children),
);


/* Иницилизация карты (с метками),
 * фильтра карты
 * и формы заполнения объявления
   ========================================================================== */

/**
 * Создаем главный маркер
 */

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

/**
 * Иницилизируем карту, фильтр,
 * добавляем метки похожих объявлений,
 * блокируем поле адрес для редактирования
 */

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
  .once('tileload', onMapLoad);

/**
 * Активируем форму создания объявления
 */

activateFormAd(
  (parent, children) => enableElements(parent, children),
);


/* Передаем в поле адрес координаты метки
   ========================================================================== */

getAddress(mainMarker);

//отслеживаем изменение положения главного маркера
mainMarker.on('move', (evt) => getAddress(evt.target));

export { rollBackMap };
