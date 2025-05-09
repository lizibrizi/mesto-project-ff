const generateCardNode = (cardData, clonedTemplate) => {
    const cardImage = clonedTemplate.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    clonedTemplate.querySelector('.card__title').textContent = cardData.name;

   const deleteButton = clonedTemplate.querySelector('.card__delete-button');
   deleteButton.addEventListener('click', handleDeleteCard);

    return clonedTemplate;
}

function handleDeleteCard (event) {
    const cardElement = event.target.closest ('.card');
    if (cardElement) {
        cardElement.remove();
    }
}

const generateCardList = (data, template) =>
    data.map(cardData => generateCardNode(cardData, template.cloneNode(true)));