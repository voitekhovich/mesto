import {setSubmitButtonDisable} from './utils.js';

export default class FormValidator {

  constructor(set, form) {
    this._inputSelector = set.inputSelector;
    this._submitButtonSelector = set.submitButtonSelector;
    this._inactiveButtonClass = set.inactiveButtonClass;
    this._inputErrorClass = set.inputErrorClass;
    this._errorClass = set.errorClass;
    this._form = form;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
  
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };
  
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  
  setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  
  };
  
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
    
  }
  
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      setSubmitButtonDisable(buttonElement);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

}