import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formSubmit = this._popup.querySelector('.form__submit');
    this._defaulTextSubmit = this._formSubmit.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit.textContent = 'Сохранение...';
      this._handleFormSubmit(this._card);
      this.close();
    })
  }

  open(card) {
    this._card = card;
    super.open();
  }

  close(){
    super.close();
    this._formSubmit.textContent = this._defaulTextSubmit;
  }
}