import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._formSubmit = this._popup.querySelector('.form__submit');
    this._defaulSubmitText = this._formSubmit.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmit(this._card);
    })
  }

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._formSubmit.textContent = loadingText;
    } else {
      this._formSubmit.textContent = this._defaulSubmitText;
    }
  }

  open(card) {
    this._card = card;
    super.open();
  }

  close(){
    super.close();
  }
}