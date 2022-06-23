const showInputError = (objectsForm, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(objectsForm.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objectsForm.errorClass);
};

const hideInputError = (objectsForm, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(objectsForm.inputErrorClass);
  errorElement.classList.remove(objectsForm.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (objectsForm, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(objectsForm, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(objectsForm, formElement, inputElement);
  }
};

const setEventListeners = (objectsForm, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(objectsForm.inputSelector));
  const buttonElement = formElement.querySelector(objectsForm.submitButtonSelector);
  toggleButtonState(objectsForm, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(objectsForm, formElement, inputElement);
      toggleButtonState(objectsForm, inputList, buttonElement);
    });
  });

};

const enableValidation = (objectsForm) => {
  const formList = Array.from(document.querySelectorAll(objectsForm.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(objectsForm, formElement);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  
}

const toggleButtonState = (objectsForm, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    setSubmitButtonDisable(buttonElement);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(objectsForm.inactiveButtonClass);
  }
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}); 