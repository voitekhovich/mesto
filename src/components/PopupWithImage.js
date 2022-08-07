import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._imageBox = this._popup.querySelector('.imagebox__img');
    this._imageCaption = this._popup.querySelector('.imagebox__caption');
  }

  open(data) {
    this._imageBox.src = data.src;
    this._imageBox.alt = data.alt;
    this._imageCaption.textContent = data.alt;
    super.open()
  }

}