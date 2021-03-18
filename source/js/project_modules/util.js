
/* Переменные
   ========================================================================== */

const MinPriceHousing = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000,
};

const DEFAULT_FILTER_VALUE = 'any';

const Housing_Price = {
  LOW: 10000,
  Middle: {
    FROM: 10000,
    TO: 50000,
  },
  HIGH: 50000,
};

const TEMPLATE_IMG_TYPE = /png|jpeg?/i;
const MESSAGE_ERROR_TYPE_IMG = 'Пожалуйста, загрузите изображение формата png или jpeg!';


/* Вкл - Выкл элементов
   ========================================================================== */

const disableElements = (parent, children) => {
  parent.classList.add('ad-form--disabled');

  for (const child of children) {
    child.disabled = true;
  }
};

const enableElements = (parent, children) => {
  parent.classList.remove('ad-form--disabled');

  for (const child of children) {
    child.disabled = false;
  }
};

/* Проверка событий
   ========================================================================== */

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

/* Размещение похожих объявлений в балунах
   ========================================================================== */

const hideElement = (item) => item.classList.add('hidden');

const addInnerElements = (parent, items, htmlTag) => {
  if (items.length === 0) {
    return hideElement(parent);
  }

  parent.innerHTML = '';

  items.forEach((item) => {
    let childTag;

    if (htmlTag === 'li') {
      childTag = `<li class="popup__feature popup__feature--${item}"></li>`;
    }

    if (htmlTag === 'img') {
      childTag = `<img src="${item}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
    }

    parent.insertAdjacentHTML('beforeend', childTag);
  });
}

/* Корреляция значений полей
   ========================================================================== */

const compareTypes = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
};

const getMinPrice = (type) => {
  switch (type) {
    case 'bungalow':
      return MinPriceHousing.BUNGALOW;
    case 'flat':
      return MinPriceHousing.FLAT;
    case 'house':
      return MinPriceHousing.HOUSE;
    case 'palace':
      return MinPriceHousing.PALACE;
  }
};

const setMinPrice = (fromSelect, forInput) => {
  const minPrice = getMinPrice(fromSelect.value);

  forInput.min = minPrice;
  forInput.placeholder = minPrice;
};

const correlateOptions = (fromOption, forOption) => {
  forOption.selectedIndex = fromOption.selectedIndex;
};

/* Валидация полей
   ========================================================================== */

const validateSelector = (quantityRooms, quantityGuests, selectMessageError) => {
  if (quantityRooms === '1' && quantityGuests !== '1') {
    selectMessageError.
      setCustomValidity('1 комната подходит только для 1-го гостя');

  } else if (quantityRooms === '2' && (quantityGuests === '3' || quantityGuests === '0')) {
    selectMessageError.
      setCustomValidity('2 комнаты подходят только для 1-го или 2-х гостей');

  } else if (quantityRooms === '3' && quantityGuests === '0') {
    selectMessageError.
      setCustomValidity('3 комнаты подходят только для 1-го, 2-х или 3-х гостей');

  } else if (quantityRooms === '100' && quantityGuests !== '0') {
    selectMessageError.
      setCustomValidity('100 комнат не для гостей');

  } else {
    return true;
  }
};

const showMessageError = (validityStatus, selectMessageError, selectFocus) => {

  if (validityStatus) {
    selectMessageError.setCustomValidity('');
    selectFocus.setCustomValidity('');

    selectMessageError.style.boxShadow = '0 0 1px 0 #008000';
    selectFocus.style.boxShadow = '0 0 1px 0 #008000';

  } else {
    selectMessageError.style.boxShadow = null;
  }

  selectMessageError.reportValidity();
};

const checkInput = (input) => {
  input.addEventListener('input', () => {
    input.reportValidity();

    if (input.validity.valid) {
      input.style.boxShadow = '0 0 1px 0 #008000';

    } else {
      input.style.boxShadow = null;
    }
  });
};

const rollBackStyle = (element) => element.style.boxShadow = null;

/* Фильтрация объявлений
   ========================================================================== */

/**
 * Фильтрация селекторов
 */

const filterType = (valueSelect, valueAd) => {
  return (valueSelect !== valueAd && valueSelect !== DEFAULT_FILTER_VALUE) ? false : true;
};

const filterPrice = (valueSelect, valueAd) => {
  if (valueSelect === DEFAULT_FILTER_VALUE) {
    return true;

  } else {

    if (valueSelect === 'low' && valueAd > Housing_Price.LOW) {
      return false;

    } else if (valueSelect === 'middle' &&
               (valueAd <= Housing_Price.Middle.FROM ||
                 valueAd >= Housing_Price.Middle.TO)) {

      return false;

    } else if (valueSelect === 'high' && valueAd < Housing_Price.HIGH) {
      return false;

    } else {
      return true;
    }
  }
};

const filterRoomsGuests = (valueSelect, valueAd) => {
  valueAd = String(valueAd);
  return (valueSelect !== valueAd && valueSelect !== DEFAULT_FILTER_VALUE) ? false : true;
};

/**
 * Фильтрация чекбоксов "особенности жилья"
 */

const getCheckedValue = (parentFeatures) => {
  const activeFeatures = parentFeatures.querySelectorAll('input:checked');
  return Array.from(activeFeatures).map((cb) => cb.value);
}

const compareCheckedValue = (checkedValues, adFeatures) => {

  if (checkedValues.length === 0) {
    return true;
  }

  let result = true;
  checkedValues.forEach((element) => {

    if(!adFeatures.includes(element)) {
      result = false;
    }
  });

  return result;
};


/* Валидация превью
   ========================================================================== */

const checkFileChooser = (fileType, input, delay) => {

  if (TEMPLATE_IMG_TYPE.test(fileType)) {
    input.setCustomValidity('');
    return true;

  } else {
    input.setCustomValidity(MESSAGE_ERROR_TYPE_IMG);
    input.reportValidity();

    setTimeout(
      () => input.setCustomValidity(''),
      delay,
    );

    return false;
  }
};

const showPreview = (elementInput, elementImg, delay) => {
  const file = elementInput.files[0];
  const fileType = file.type;

  if(checkFileChooser(fileType, elementInput, delay)) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      elementImg.src = reader.result;
    });

    reader.readAsDataURL(file);

    return true;

  } else {
    return false;
  }
};


/* Устранение дребезга
   ========================================================================== */

const debounce = (cb, timeout) => {
  let isCooldown = false;

  return () => {

    if (isCooldown) {
      return;
    }

    cb();

    isCooldown = true;

    setTimeout(
      () => isCooldown = false,

      timeout,
    );
  };
};


export {
  disableElements,
  enableElements,
  isEscEvent,
  hideElement,
  addInnerElements,
  compareTypes,
  setMinPrice,
  correlateOptions,
  validateSelector,
  showMessageError,
  checkInput,
  rollBackStyle,
  filterType,
  filterPrice,
  filterRoomsGuests,
  getCheckedValue,
  compareCheckedValue,
  showPreview,
  debounce
};
