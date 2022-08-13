export default class Card {
  
  constructor(data, cardSelector, handleCardClick, handleRemoveCard, getOwnerTrash, getOwnerLike, setCardLiked) {
    this.data = data;
    
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveCard = handleRemoveCard;
    this._getOwnerTrash = getOwnerTrash;
    this._getOwnerLike = getOwnerLike;
    this._setCardLiked = setCardLiked;

    this.isOwenLiked = false;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  _setEventListeners() {
    this._like.addEventListener('click', evt => this._handleLikeElement(evt));
    this._image.addEventListener('click', () => this._handlePopupImageElement());
    
    if (this._getOwnerTrash()) {
      this._trash.addEventListener('click', () => this._handleRemoveElement());
    } else {
      this.delTrashElement();
    }

  }

  _handleLikeElement() {
    this._setCardLiked();
  }

  _handleRemoveElement() {
    this._handleRemoveCard(this.element);
  };
  
  _handlePopupImageElement() {
    this._handleCardClick();
  };

  generateCard() {
    this.element = this._getTemplate();
    this._trash = this.element.querySelector('.element__trash');
    this._title = this.element.querySelector('.element__title');
    this._image = this.element.querySelector('.element__image');
    this._like = this.element.querySelector('.element__like');
    this._likeCount = this.element.querySelector('.element__likes-count');

    this._setEventListeners();
    this._getOwnerLike();
    
    this._image.src = this.data.link;
    this._image.alt = this.data.name;
    this._title.textContent = this.data.name;
    this._likeCount.textContent = this.data.likes.length;

    return this.element;
  }

  isOwnerLiked(ownerId) {
    return Boolean(this.data.likes.findIndex(item => item._id === ownerId) + 1);
  }

  setLikeCount(count) {
    this._likeCount.textContent = count;
  }

  setLike() {
    this._like.classList.add('element__like_active');
    this.isOwenLiked = true;
  }

  delLike() {
    this._like.classList.remove('element__like_active');
    this.isOwenLiked = false;
  }

  delTrashElement() {
    this._trash.remove();
  }

}