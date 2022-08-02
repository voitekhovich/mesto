import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  open(data) {
    const imageboxImg = this._selector.querySelector('.imagebox__img');
    imageboxImg.src = data.src;
    imageboxImg.alt = data.alt;
    this._selector.querySelector('.imagebox__caption').textContent = data.alt;
    super.open()
  }

}