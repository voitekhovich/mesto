import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this.form = this._popup.querySelector('.popup__form');
    this._formInputList = Array.from(this._popup.querySelectorAll('.form__input'));
    this._formSubmit = this._popup.querySelector('.form__submit');
    this._defaulSubmitText = this._formSubmit.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._formInputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmit(this._getInputValues());
    })
  }

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._formSubmit.textContent = loadingText;
    } else {
      this._formSubmit.textContent = this._defaulSubmitText;
    }
  }

  close() {
    this.form.reset();
    super.close();
  }

}