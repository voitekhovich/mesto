export default class Popup {

  constructor(popupSelector) {
    this._selector = document.querySelector(popupSelector);
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

  _handleEscClose(evt) {
    console.log('esc: ' + evt.key);
    if (evt.key === 'Escape'){
      console.log(this);
      this.close();
    }
  }

  setEventListeners() {
    this._selector.addEventListener('mousedown', () => {
      if (this._selector.classList.contains('popup_visible') || this._selector.classList.contains('popup__close')) {
        this.close();
      }
    })
  }

}