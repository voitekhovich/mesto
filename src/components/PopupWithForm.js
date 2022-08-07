import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
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
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

}