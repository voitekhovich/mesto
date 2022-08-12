import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._popupForm = this._popup.querySelector('.popup__form');
    this._formSubmit = this._popup.querySelector('.form__submit');
    this._defaulTextSubmit = this._formSubmit.textContent;
    this._formInputList = Array.from(this._popup.querySelectorAll('.form__input'));
  }

  _getInputValues() {
    this._formValues = {};
    this._formInputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  getForm(){
    return this._popupForm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit.textContent = 'Сохранение...';
      this._handleFormSubmit(this._getInputValues());
    })
  }

  close() {
    this._popupForm.reset();
    this._formSubmit.textContent = this._defaulTextSubmit;
    super.close();
  }

}