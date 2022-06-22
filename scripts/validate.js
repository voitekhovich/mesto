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
  toggleButtonState(objectsForm, inputList, buttonElement, formElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(objectsForm, formElement, inputElement);
      toggleButtonState(objectsForm, inputList, buttonElement, formElement);
    });
  });

};

const enableValidation = (objectsForm) => {
  const formList = Array.from(document.querySelectorAll(objectsForm.formSelector));
  
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(objectsForm, formElement);
  });

};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  
}

const toggleButtonState = (objectsForm, inputList, buttonElement, formElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(objectsForm.inactiveButtonClass);
    formElement.removeEventListener('submit', btnevents[formElement.name]);
  } else {
    buttonElement.classList.remove(objectsForm.inactiveButtonClass);
    formElement.addEventListener('submit', btnevents[formElement.name]);
  }
}

// enableValidation();

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}); 