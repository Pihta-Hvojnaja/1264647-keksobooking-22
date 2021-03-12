import { getData } from './api.js';

import {
  disableElements,
  enableElements
} from './util.js';

import {
  deactivatingFormFilter,
  activatingFormFilter,
  compare,
  renderAdClickType,
  renderAdClickPrice
} from './form-filter.js';

import {
  deactivatingFormAd,
  activatingFormAd,
  getAddress
} from './form-ad.js';

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

//ФУНКЦИИ
//создает главный маркер
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

//создает маркеры с балунами
let groupMarkers;

const createMarkersAds = (ads) => {
  const markers = [];

  ads.forEach((ad) => {

    if (compare(ad)) {
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

//возвращает главную метку в дефолтную позицию
const rollBackMap = () => {
  map.setView([TOKYO_LAT, TOKYO_LNG]);
  mainMarker.setLatLng([MAIN_MARKER_LAT, MAIN_MARKER_LNG]);
};


//ДЕАКТИВАЦИЯ ФИЛЬТРА КАРТЫ И ФОРМЫ ЗАПОЛНЕНИЯ ОБЪЯВЛЕНИЯ
deactivatingFormFilter(
  (parent, children) => {
    disableElements(parent, children);
  },
);

deactivatingFormAd(
  (parent, children) => {
    disableElements(parent, children);
  },
);


//ИНИЦИЛИЗАЦИЯ КАРТЫ, ФИЛЬТРА КАРТЫ И ФОРМЫ ЗАПОЛНЕНИЯ ОБЪЯВЛЕНИЯ
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
      (ads) => {
        //создание меток похожих объявлений
        createMarkersAds(ads);
        renderAdClickType(() => createMarkersAds(ads));
        renderAdClickPrice(() => createMarkersAds(ads));
        //активация фильтра карты
        activatingFormFilter(
          (parent, children) => {
            enableElements(parent, children);
          },
        );
      },

      () => showAlert('Не удалось загрузить похожие объявления!'),
    );

    activatingFormAd(
      (parent, children) => {
        enableElements(parent, children);
      },
    );
  });


//ПЕРЕДАЕМ В ПОЛЕ АДРЕС КООРДИНАТЫ МЕТКИ
getAddress(mainMarker);
mainMarker.on('move', (evt) => getAddress(evt.target));

export { rollBackMap };
