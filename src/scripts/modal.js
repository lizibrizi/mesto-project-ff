// Функция открытия модального окна
export const openPopup= (popup) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
}
// Функция закрытия модального окна
export const closePopup = (popup) => {
   popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
}


// Функция-обработчик для Esc
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}