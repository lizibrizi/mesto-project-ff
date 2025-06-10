import { likeCard, unlikeCard, removeCard } from './api.js';

export const generateCardNode = (
  cardData,
  template,
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

  // Отображение лайка текущего пользователя
 if (cardData.likes.some(user => user._id === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Обработка клика по изображению
  cardImage.addEventListener('click', () =>
    handleCardImageClick({
      link: cardData.link,
      name: cardData.name,
    })
  );

  // Обработка лайков
  likeButton.addEventListener('click', () => {
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
  });

  // Показываем кнопку удаления только для своих карточек
  if (cardData.owner._id === currentUserId) {
    deleteButton.addEventListener('click', () => {
      removeCard(cardData._id)
        .then(() => {
          clonedTemplate.remove();
        })
        .catch((err) => {
          console.error('Ошибка при удалении карточки:', err);
        });
});
  } else {
    deleteButton.remove(); // Скрываем кнопку, если карточка не твоя
  }

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
