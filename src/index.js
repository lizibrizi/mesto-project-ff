  import './pages/index.css';

import { generateCardNode, generateCardList } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';
import { clearValidation, enableValidation } from './scripts/validation.js';
import {  addCard,
  getInitialCards,
  getUserInfo,
  removeCard,
  likeCard,
  unlikeCard,
  updateUserAvatar,
  updateUserProfile,} from './scripts/api.js';

// DOM-элементы
const cardsDOMContainer = document.querySelector('.places__list');
const templateRoot = document.querySelector('#card-template');
const templateCardNode = templateRoot.content.querySelector('.card');

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('input[name="name"]');
const descriptionInput = formEditProfile.querySelector('input[name="description"]');

const addCardForm = document.querySelector('form[name="new-place"]');
const placeNameInput = addCardForm.querySelector('input[name="place-name"]');
const placeLinkInput = addCardForm.querySelector('input[name="link"]');

const editPopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popups = document.querySelectorAll(".popup");
let currentUserId = null; // глобальная переменная для хранения ID

// Элементы для обновления аватара
const avatarEditButton = document.querySelector (".profile__image-edit-button");
const avatarPopup = document.querySelector (".popup_type_avatar");
const avatarForm = document.querySelector ("form[name=\"avatar-update\"]");
const avatarLinkInput = avatarForm.querySelector ("input[name=\"avatar-link\"]");
const profileImage = document.querySelector (".profile__image");

// Обработчик отправки формы обновления аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault ();
  const avatarLink = avatarLinkInput.value;
  const submitButton = evt.submitter;
  const originalButtonText = submitButton.textContent;
   renderLoading (true, submitButton, originalButtonText);
  // Отправляем запрос на сервер для обновления аватара
  updateUserAvatar (avatarLink)
    .then ((userData) => {
      // Обновляем аватар на странице
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closePopup (avatarPopup);
      avatarForm.reset ();
    })
    .catch ((err) => {
      console.error (`Ошибка при обновлении аватара: ${err}`);
    })
     .finally (() => {
      // Выключаем индикацию загрузки
      renderLoading (false, submitButton, originalButtonText);
    });
  }

  // Отправка формы обновления аватара
avatarForm.addEventListener ("submit", handleAvatarFormSubmit);

// Открытие попапа обновления аватара
avatarEditButton.addEventListener ("click", () => {
  avatarForm.reset ();
  clearValidation (avatarForm, validationConfig);
  openPopup (avatarPopup);
});


// Обработка изображения в карточке
function handleCardImageClick({ link, name }) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openPopup(imagePopup);
}


// Обработка формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const originalButtonText = submitButton.textContent;
  renderLoading(true, submitButton, originalButtonText);

  const name = nameInput.value;
  const about = descriptionInput.value;

  updateUserProfile(name, about)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(editPopup);
    })
    .catch((err) => {
      console.error(`Ошибка при обновлении профиля: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, originalButtonText);
  });
}
 
//функция-обработчик лайка
function handleLikeButtonClick(cardData, likeButton, likeCounter) { 
   const isLiked = likeButton.classList.contains('card__like-button_is-active');
   const method = isLiked ? unlikeCard : likeCard;

    method(cardData._id)
      .then((updatedCard) => {
        likeButton.classList.toggle('card__like-button_is-active', !isLiked);
        likeCounter.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.error('Ошибка при обновлении лайка:', err);
      });
  };

//функция-обработчик удаления
function handleDeleteCard(cardId, cardElement) {
      removeCard(cardId)
        .then(() => {
          cardElement.remove();
        })
        .catch((err) => {
          console.error('Ошибка при удалении карточки:', err);
         });
        }

// Обработка формы добавления новой карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const originalButtonText = submitButton.textContent;
  renderLoading(true, submitButton, originalButtonText);

  const name = placeNameInput.value;
  const link = placeLinkInput.value;

  addCard(name, link)
    .then((newCard) => {
      const cardElement = generateCardNode(
        newCard,
        templateCardNode,
        handleDeleteCard,
        handleLikeButtonClick,
        handleCardImageClick,
        currentUserId
      );
      cardsDOMContainer.prepend(cardElement);
      closePopup(addCardPopup);
      addCardForm.reset();
    })
    .catch((err) => {
      console.error(`Ошибка при добавлении карточки: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, originalButtonText);
  });
}

// Валидация форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);


// Утилитарная функция для изменения текста кнопки в зависимости от состояния загрузки
function renderLoading(isLoading, button, buttonText = "Сохранить", loadingText = "Сохранение...") {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

// Универсальное закрытие попапов
popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closePopup(popup));
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

// Открытие попапа редактирования профиля
editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openPopup(editPopup);
});

// Открытие попапа добавления карточки
addButton.addEventListener("click", () => {
   addCardForm.reset ();
   clearValidation(addCardForm, validationConfig);
   openPopup(addCardPopup);
});

// Получаем данные с сервера при загрузке страницы

 Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;

    // Устанавливаем данные пользователя
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    // Генерируем карточки
    const cardElements = generateCardList(
      cards.reverse(),
      templateCardNode,
      handleDeleteCard,
      handleLikeButtonClick,
      handleCardImageClick,
      currentUserId
    );
    cardsDOMContainer.append(...cardElements);
  })
  .catch((err) => {
    console.error(`Ошибка при инициализации данных:${err}`);
});

// Обработчики отправки форм
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);
