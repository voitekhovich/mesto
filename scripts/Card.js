import {openPopupImage} from './utils.js';

export default class Card {
  
  constructor(link, name, cardSelector) {
    this._link = link;
    this._name = name;
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
    this._element.querySelector('.element__image').alt = this._name;
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
    evt.currentTarget.closest('.element').remove();
  };
  
  _handlePopupImageElement(evt) {
    openPopupImage(evt);
  };

}