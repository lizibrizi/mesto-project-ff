import { likeCard, unlikeCard, removeCard } from './api.js';

export const generateCardNode = (
  cardData,
  template,
  handleDeleteCard,
  handleLikeButtonClick,
  handleCardImageClick,
  currentUserId
) => {
  const clonedTemplate = template.cloneNode(true);
  const cardImage = clonedTemplate.querySelector('.card__image');
  const likeButton = clonedTemplate.querySelector('.card__like-button');
  const deleteButton = clonedTemplate.querySelector('.card__delete-button');
  const cardTitle = clonedTemplate.querySelector('.card__title');
  const likeCounter = clonedTemplate.querySelector('.card__like-count');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;


  // Установка количества лайков
  likeCounter.textContent = cardData.likes.length;

  // Отмечаем лайк активным, если текущий пользователь уже лайкал
  if (cardData.likes.some(user => user._id === currentUserId)) {
    likeButton.classList.add('card__like-button_active');
  }

  // Удаляем кнопку удаления, если карточка чужая
  if (cardData.owner._id !== currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () =>
      handleDeleteCard(cardData._id, clonedTemplate)
    );
  }
// Обработчики
  likeButton.addEventListener('click', () =>
    handleLikeButtonClick(cardData, likeButton, likeCounter)
  );

  cardImage.addEventListener('click', () =>
    handleCardImageClick({ link: cardData.link, name: cardData.name })
  );

  return clonedTemplate;
};

export const generateCardList = (
  data,
  template,
  handleDeleteCard,
  handleLikeButtonClick,
  handleCardImageClick,
  currentUserId
) => {
  return data.map(cardData =>
    generateCardNode(
      cardData,
      template,
      handleDeleteCard,
      handleLikeButtonClick,
      handleCardImageClick,
      currentUserId
    )
 );
};