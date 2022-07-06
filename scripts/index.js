const page = document.querySelector('.page');

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

import {openPopup, closePopup, setSubmitButtonDisable} from './utils.js';

// Установка валидации на формы

import FormValidator from './FormValidator.js';

const set = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const formList = Array.from(document.querySelectorAll('.form'));
formList.forEach((formElement) => {
  const validator = new FormValidator(set, formElement)
    validator.setEventListeners();
});

// Наполнение страницы карточками

import Card from './Card.js';
import {initialCards} from './cards.js';

initialCards.reverse().forEach(data => {
  const card = new Card(data, '.element-template');
  const cardElement = card.generateCard();
  document.querySelector('.elements').append(cardElement);
});

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
  setSubmitButtonDisable(formEditButtonSave);
  closePopup(popupEdit);
}

profileButtonEdit.addEventListener('click', openPopupEdit);
popupEdit.addEventListener('submit', savePopupEdit);

// Popup добавления карточки

function openPopupAdd() {
  formAdd.reset();
  setSubmitButtonDisable(formAddButtonSave);
  openPopup(popupFormAdd);
}

function savePopupAdd(evt) {  
  evt.preventDefault();

  const data = {
    name: formAddInputTitle.value,
    link: formAddInputLink.value,
  }

  const card = new Card(data, '.element-template');
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);


  closePopup(popupFormAdd);
}

profileButtonAdd.addEventListener('click', openPopupAdd);
popupFormAdd.addEventListener('submit', savePopupAdd);