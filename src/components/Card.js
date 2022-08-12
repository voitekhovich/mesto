export default class Card {
  
  constructor(data, cardSelector, handleCardClick, handleRemoveCard, getOwnerTrash, getOwnerLike, setCardLiked) {
    this._data = data;
    
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._likesCount = data.likes.length;
    this._isOwenLiked = false;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveCard = handleRemoveCard;
    this._getOwnerTrash = getOwnerTrash;
    this._getOwnerLike = getOwnerLike;
    this._setCardLiked = setCardLiked;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  isOwnerLiked(ownerId) {
    return Boolean(this._data.likes.findIndex(item => item._id === ownerId) + 1);
  }

  setCountLikes(count) {
    this._element.querySelector('.element__likes-count').textContent = count;
  }

  setLike() {
    this.elementLike.classList.add('element__like_active');
    this._isOwenLiked = true;
  }

  delLike() {
    this.elementLike.classList.remove('element__like_active');
    this._isOwenLiked = false;
  }

  delTrashElement() {
    this._element.querySelector('.element__trash').remove();
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this.elementLike = this._element.querySelector('.element__like');
    this._setEventListeners();
    this._getOwnerLike();

    
    this._elementImage = this._element.querySelector('.element__image');
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__likes-count').textContent = this._likesCount;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      this._handleLikeElement(evt);
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handlePopupImageElement();
    });
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleRemoveElement();
    });
    
    if (this._getOwnerTrash()){
      this._element.querySelector('.element__trash').addEventListener('click', () => {
        this._handleRemoveElement();
      });
    } else {
      this._element.querySelector('.element__trash').remove();
    }

  }

  _handleLikeElement(evt) {
    this._setCardLiked();
  }

  _handleRemoveElement() {
    this._handleRemoveCard(this._element);
  };
  
  _handlePopupImageElement() {
    this._handleCardClick();
  };

}