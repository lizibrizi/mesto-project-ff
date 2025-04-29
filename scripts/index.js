addEventListener("DOMContentLoaded", (event) => {
 const cardsDOMContainer = document.querySelector('.places__list');
 const templateRoot = document.querySelector('#card-template');
 const templateCardNode = templateRoot.content.querySelector('.card');

 const cardNodes = generateCardList(CARDS_DATA, templateCardNode);

 cardsDOMContainer.append(...cardNodes);
});
