export const generateCardNode = (cardData, template, handleDeleteCard, handleLikeButtonClick, handleCardImageClick ) => {
    const clonedTemplate = template.cloneNode(true);
    const cardImage = clonedTemplate.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    clonedTemplate.querySelector('.card__title').textContent = cardData.name;

   const deleteButton = clonedTemplate.querySelector('.card__delete-button');
   deleteButton.addEventListener('click', handleDeleteCard);

   const likeButton = clonedTemplate.querySelector('.card__like-button');
   likeButton.addEventListener('click', handleLikeButtonClick);

   cardImage.addEventListener('click', () => handleCardImageClick(cardData));

   return clonedTemplate;
};

export const generateCardList = (data, template, handleDeleteCard, handleLikeButtonClick, handleCardImageClick) =>
    data.map(cardData => generateCardNode(cardData, template, handleDeleteCard, handleLikeButtonClick, handleCardImageClick));

// Обработчик лайка
export function handleLikeButtonClick(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

// Обработчик удаления
export function handleDeleteCard(evt) {
  const cardElement = evt.target.closest('.card');
  if (cardElement) {
    cardElement.remove();
  }
}
