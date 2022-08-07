export default class FormValidator {

  constructor(validationConfig, formElement) {
    this._config = validationConfig;
    this._form = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };
  
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };
  
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState(inputList);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  
  };
  
  enableValidation() {
    this._setEventListeners();
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
    
  }

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this.disableSubmitButton();
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  static setSubmitButtonDisable(submitButton) {
    submitButton.setAttribute('disabled', 'disabled');
    submitButton.classList.add(FormValidator._formSubmitInactive);
  }

  disableSubmitButton() {
    this._buttonElement.setAttribute('disabled', 'disabled');
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  }

}