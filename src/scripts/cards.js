export const generateCardNode = (cardData, clonedTemplate, handleDeleteCard, handleLikeButtonClick, handleCardImageClick ) => {
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
    data.map(cardData => generateCardNode(cardData, template.cloneNode(true), handleDeleteCard, handleLikeButtonClick, handleCardImageClick));