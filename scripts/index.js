const page = document.querySelector('.page');

const profile = page.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileButtonEdit = profile.querySelector('.profile__edit-button')
const profileButtonAdd = profile.querySelector('.profile__add-button');

const popupFormEdit = document.querySelector('.popup_edit');
const formEditButtonClose = popupFormEdit.querySelector('.popup__btn-close');
const formEditButtonSave = popupFormEdit.querySelector('.form__submit');
const formEditInputName = popupFormEdit.querySelector('.form__item_type_name');
const formEditInputAbout = popupFormEdit.querySelector('.form__item_type_about');

const popupFormAdd = document.querySelector('.popup_add');
const formAddButtonClose = popupFormAdd.querySelector('.popup__btn-close');
const formAddButtonSave = popupFormAdd.querySelector('.form__submit');
const formAdd = popupFormAdd.querySelector('.popup__form');
const formAddInputTitle = popupFormAdd.querySelector('.form__item_type_title');
const formAddInputLink = popupFormAdd.querySelector('.form__item_type_link');

const popupImage = document.querySelector('.popup_image');
const formImageButtonClose = popupImage.querySelector('.popup__btn-close');

// Наполнение страницы карточками

const elementsList = page.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template')
  .content.querySelector('.element');
const getElementByEvent = e => e.currentTarget.closest('.element');

const likeElement = evt => {
  evt.currentTarget.classList.toggle('element__like_active');
};

const removeElement = evt => {
  getElementByEvent(evt).remove();
};

const popupImageElement = evt => {
  openPopupImage(evt);
};

const addElementListeners = element => {
  element.querySelector('.element__like').addEventListener('click', likeElement);
  element.querySelector('.element__trash').addEventListener('click', removeElement);
  element.querySelector('.element__image').addEventListener('click', popupImageElement);
}

const createElement = data => {
  const element = elementTemplate.cloneNode(true);
  const elementImage = element.querySelector('.element__image');

  elementImage.src = data.link;
  elementImage.alt = data.name;
  element.querySelector('.element__title').textContent = data.name;
  
  addElementListeners(element);

  return element;
}

const addElement = element => {
  elementsList.prepend(element);
}

initialCards.reverse().forEach(data => {
  addElement(createElement(data));
});

// Popups

const openPopup = popupName => {
  popupName.classList.add('popup_visible');
}

const closePopup = popupName => {
  popupName.classList.remove('popup_visible');
}

// Popup редактирование профиля

function openPopupEdit() {
  formEditInputName.value = profileName.textContent;
  formEditInputAbout.value = profileAbout.textContent;
  openPopup(popupFormEdit);
}

function savePopupEdit(evt) {  
  evt.preventDefault();
  profileName.textContent = formEditInputName.value;
  profileAbout.textContent = formEditInputAbout.value;
  closePopup(popupFormEdit);
}

profileButtonEdit.addEventListener('click', openPopupEdit);
formEditButtonClose.addEventListener('click', () => {closePopup(popupFormEdit)});
formEditButtonSave.addEventListener('click', savePopupEdit);

// Popup добавления карточки

function openPopupAdd() {
  formAdd.reset();
  openPopup(popupFormAdd);
}

function savePopupAdd(evt) {  
  evt.preventDefault();
  addElement(createElement(
    {
    name: formAddInputTitle.value,
    link: formAddInputLink.value,
  }));
  closePopup(popupFormAdd);
}

profileButtonAdd.addEventListener('click', openPopupAdd);
formAddButtonClose.addEventListener('click', () => {closePopup(popupFormAdd)});
formAddButtonSave.addEventListener('click', savePopupAdd);

// Popup c картинкой

function openPopupImage(evt) {
  const imageboxImg = popupImage.querySelector('.imagebox__img');
  imageboxImg.src = evt.currentTarget.src;
  imageboxImg.alt = evt.currentTarget.alt;
  popupImage.querySelector('.imagebox__caption').textContent = evt.currentTarget.alt;
  openPopup(popupImage)
}

formImageButtonClose.addEventListener('click', () => {closePopup(popupImage)});

// Валидация форм

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
    setEventListeners(formElement);
  })
}

enableValidation();