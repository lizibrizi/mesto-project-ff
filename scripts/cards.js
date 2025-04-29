const generateCardNode = (cardData, clonedTemplate) => {
    const cardImage = clonedTemplate.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    clonedTemplate.querySelector('.card__title').textContent = cardData.name;

    clonedTemplate.querySelector('.card__delete-button')
        .addEventListener('click', event => event.target.remove());

    return clonedTemplate;
}

const generateCardList = (data, template) =>
    data.map(cardData => generateCardNode(cardData, template.cloneNode(true)));