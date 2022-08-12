export default class Popup {

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._escHandler = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape'){
      this.close();
    }
  }

  getPopup() {
    return this._popup;
  }

  open() {
    document.addEventListener('keydown', this._escHandler);
    this._popup.classList.add('popup_visible');
  }

  close() {
    document.removeEventListener('keydown', this._escHandler);
    this._popup.classList.remove('popup_visible');
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_visible') || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    })
  }

}