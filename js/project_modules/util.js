//Вкл - Выкл элементов
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

//Проверка событий
const isClickEvent = (evt) => {
  return evt.type === 'click';
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

//корреляция значений полей
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
    case 'flat':
      return 1000;
    case 'bungalow':
      return 0;
    case 'house':
      return 5000;
    case 'palace':
      return 10000;
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

//Валидация полей
const showMessageError = (quantityRooms, quantityGuests, selectMessageError) => {

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
    selectMessageError.setCustomValidity('');
  }

  selectMessageError.reportValidity();
};

const checkSelect = (selectFocus, selectCheck) => {

  if (selectCheck.validity.valid) {
    selectFocus.style.boxShadow = '0 0 1px 0 #008000';
    selectCheck.style.boxShadow = '0 0 1px 0 #008000';

  } else {
    selectCheck.style.boxShadow = '0 0 2px 2px #ff6547';
  }
};

const checkInput = (input) => {
  input.addEventListener('input', () => {
    input.reportValidity();

    if (input.validity.valid) {
      input.style.boxShadow = '0 0 1px 0 #008000';

    } else {
      input.style.boxShadow = '0 0 2px 2px #ff6547';
    }
  });
};

export {
  disableElements,
  enableElements,
  isClickEvent,
  isEscEvent,
  compareTypes,
  setMinPrice,
  correlateOptions,
  showMessageError,
  checkSelect,
  checkInput
};
