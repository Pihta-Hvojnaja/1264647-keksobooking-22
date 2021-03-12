const formFilter = document.querySelector('.map__filters');
const formFilterElements = formFilter.querySelectorAll('.map__filter, .map__features');

const housingTypeFilter = formFilter.querySelector('#housing-type');
const housingPriceFilter = formFilter.querySelector('#housing-price');

//ДЕАКТИВАЦИЯ-АКТИВАЦИЯ ФОРМЫ ФИЛЬТРА
const deactivatingFormFilter = (cb) => {
  cb(formFilter, formFilterElements);
};

const activatingFormFilter = (cb) => {
  cb(formFilter, formFilterElements);
};

const compare = (ad) => {
  //console.log(ad);

  let valueSelect = housingTypeFilter.value;
  let valueAd = ad.offer.type;
  if (valueSelect !== valueAd && valueSelect !== 'any') {
    return false;
  }

  valueSelect = housingPriceFilter.value;
  valueAd = ad.offer.price;
  if (valueSelect !== 'any') {
    if (valueSelect === 'low' && valueAd >= 10000) {
      return false;
    }

    if (valueSelect === 'middle' && (valueAd < 10000 || valueAd >= 10000)) {
      return false;
    }

    if (valueSelect === 'high' && valueAd <= 50000) {
      return false;
    }
  }

  return true;
};

const renderAdClickType = (cb) => {
  housingTypeFilter.addEventListener('change', () => {
    cb();
  });
};

const renderAdClickPrice = (cb) => {
  housingPriceFilter.addEventListener('change', () => {
    cb();
  });
};


export {
  formFilter,
  deactivatingFormFilter,
  activatingFormFilter,
  compare,
  renderAdClickType,
  renderAdClickPrice
};
