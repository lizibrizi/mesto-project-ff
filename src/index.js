 document.addEventListener('DOMContentLoaded', () => {
    
 const cardsDOMContainer = document.querySelector('.places__list');
 const templateRoot = document.querySelector('#card-template');
 const templateCardNode = templateRoot.content.querySelector('.card');
 const cardNodes = generateCardList(
 CARDS_DATA,
 templateCardNode,
 handleDeleteCard,
 handleLikeButtonClick, 
 handleCardImageClick
 );
 cardsDOMContainer.append(...cardNodes);
 });
 
import {CARDS_DATA} from './scripts/data.js';
import './pages/index.css';
import { generateCardNode, generateCardList } from './scripts/card.js';
import { openPopup, closePopup } from  './scripts/modal.js';
import { handleDeleteCard, handleLikeButtonClick } from './scripts/card.js';

// Элементы для редактирования профиля
const editPopup = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = formEditProfile.querySelector('input[name="name"]');
const descriptionInput = formEditProfile.querySelector('input[name="description"]');

 // Элементы для добавления карточки
 const addButton = document.querySelector(".profile__add-button");
 const addCardPopup = document.querySelector(".popup_type_new-card");
 const addCardForm = document.querySelector('form[name="new-place"]');
 const placeNameInput = addCardForm.querySelector('input[name="place-name"]');
 const placeLinkInput = addCardForm.querySelector('input[name="link"]');

 // Элементы попапа с картинкой
 const imagePopup = document.querySelector(".popup_type_image");
 const imagePopupImage = imagePopup.querySelector(".popup__image");
 const imagePopupCaption = imagePopup.querySelector(".popup__caption");

// Все попапы на странице
const popups = document.querySelectorAll(".popup");

 //ФУНКЦИИ:

 // Обработчик клика по изображению карточки
 function handleCardImageClick({ link, name }) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openPopup(imagePopup);
 }

// Обработчик отправки формы редактирования профиля
  function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
  // Обновляем данные профиля на странице
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(editPopup);
}

// Обработчик отправки формы добавления новой карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault(); 
  // Получаем значения из инпутов
  const name = placeNameInput.value;
  const link = placeLinkInput.value;
  const newCard = generateCardNode (
    {name, link},
    templateCardNode
  );
  // Добавляем карточку в начало списка
  cardsDOMContainer.prepend(newCard);
  // Закрываем попап и очищаем форму
  closePopup(addCardPopup);
  addCardForm.reset();
}

// Отправка формы редактирования профиля
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
// Отправка формы добавления карточки
addCardForm.addEventListener("submit", handleAddCardSubmit);

// Открытие попапа редактирования профиля
editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(editPopup);
});

// Открытие попапа добавления карточки
addButton.addEventListener("click", () => openPopup(addCardPopup));


// Универсальные обработчики закрытия попапов по крестику и оверлею
  popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closePopup(popup));
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

