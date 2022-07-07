import {openPopup, closePopup} from './utils.js';
import {initialCards} from './utils/constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const elementTemplate = '#element-template';

const page = document.querySelector('.page');
const elements = page.querySelector('.elements');

const profile = page.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileButtonEdit = profile.querySelector('.profile__edit-button')
const profileButtonAdd = profile.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_edit');
const formEditButtonSave = popupEdit.querySelector('.form__submit');
const formEditInputName = popupEdit.querySelector('.form__input_type_name');
const formEditInputAbout = popupEdit.querySelector('.form__input_type_about');

const popupFormAdd = document.querySelector('.popup_add');
const formAddButtonSave = popupFormAdd.querySelector('.form__submit');
const formAdd = popupFormAdd.querySelector('.popup__form');
const formAddInputTitle = popupFormAdd.querySelector('.form__input_type_title');
const formAddInputLink = popupFormAdd.querySelector('.form__input_type_link');

const formList = Array.from(document.querySelectorAll('.form'));

// Наполнение страницы карточками

function addElement(data, template) {
  const card = new Card(data.link, data.name, template);
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
}

// Popup редактирование профиля

function openPopupEdit() {
  formEditInputName.value = profileName.textContent;
  formEditInputAbout.value = profileAbout.textContent;
  openPopup(popupEdit);
}

function savePopupEdit(evt) {  
  evt.preventDefault();
  profileName.textContent = formEditInputName.value;
  profileAbout.textContent = formEditInputAbout.value;
  FormValidator.setSubmitButtonDisable(formEditButtonSave);
  closePopup(popupEdit);
}

// Popup добавления карточки

function openPopupAdd() {
  formAdd.reset();
  FormValidator.setSubmitButtonDisable(formAddButtonSave);
  openPopup(popupFormAdd);
}

function savePopupAdd(evt) {  
  evt.preventDefault();

  const data = {
    name: formAddInputTitle.value,
    link: formAddInputLink.value,
  }

  addElement(data, elementTemplate)
  closePopup(popupFormAdd);
}

// Наполнение страницы карточками

initialCards.forEach(item => {
  addElement(item, elementTemplate)
});

// Установка валидации на формы

const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
};

formList.forEach((formElement) => {
  const validator = new FormValidator(validationConfig, formElement);
  validator.enableValidation();
});

// Popup редактирование профиля

profileButtonEdit.addEventListener('click', openPopupEdit);
popupEdit.addEventListener('submit', savePopupEdit);

// Popup добавления карточки

profileButtonAdd.addEventListener('click', openPopupAdd);
popupFormAdd.addEventListener('submit', savePopupAdd);