export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }


  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._link;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      this._handleLikeElement(evt);
    });
    this._element.querySelector('.element__trash').addEventListener('click', (evt) => {
      this._handleRemoveElement(evt);
    });
    this._element.querySelector('.element__image').addEventListener('click', (evt) => {
      this._handlePopupImageElement(evt);
    });
  }

  _handleLikeElement(evt) {
    evt.currentTarget.classList.toggle('element__like_active');
  }

  _handleRemoveElement(evt) {
    getElementByEvent(evt).remove();
  };
  
  _handlePopupImageElement(evt) {
    //openPopupImage(evt);
  };

}


// initialCards.reverse().forEach(data => {
//   const card = new Card(data, '.element-template');
//   const cardElement = card.generateCard();
//   document.querySelector('.elements').append(cardElement);
// });