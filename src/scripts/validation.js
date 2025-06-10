//показать ошибку
function showInputError(formElement, inputElement, config, errorMessage) {
const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

// скрыть ошибку
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

// проверка поля
function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    if (inputElement.validity.patternMismatch) {
      const errorMessage = inputElement.dataset.errorMessage || "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
      showInputError(formElement, inputElement, config, errorMessage);
    } else {
      showInputError(
        formElement,
        inputElement,
        config,
        inputElement.validationMessage
      );
    }
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

// проверка на наличие хотя бы одной ошибки
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Функция деактивации кнопки
function disableButton(buttonElement, config) {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

// Функция активации кнопки
function enableButton(buttonElement, config) {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
}

// включение,отключение кнопки
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  }
}

// Функция добавления обработчиков всем полям формы
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // Проверяем состояние кнопки при первой загрузке страницы
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

// Функция очистки ошибок валидации
export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });

  // Используем выделенную функцию для деактивации кнопки
  disableButton(buttonElement, config);
}

// Функция включения валидации
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
     setEventListeners(formElement, config);
  });
}