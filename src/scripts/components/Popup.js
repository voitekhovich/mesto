export default class Popup {

  constructor(popupSelector) {
    this._selector = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape'){
      this.close();
    }
  }

  open() {
    this._escHandler = this._handleEscClose.bind(this)
    document.addEventListener('keydown', this._escHandler);
    this._selector.classList.add('popup_visible')
  }

  close() {
    document.removeEventListener('keydown', this._escHandler);
    this._selector.classList.remove('popup_visible');
  }

  setEventListeners() {
    this._selector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_visible') || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    })
  }

}