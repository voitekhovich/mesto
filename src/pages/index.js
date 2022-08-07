import '../pages/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  elementsSelector,
  validationConfig,
  elementTemplate,
  profileButtonEdit,
  profileButtonAdd,
} from '../utils/constants.js';

function handleCardClick(card) {
  popupImage.open({src: card._link, alt: card._name});
}

function createNewCard(data){
  const card = new Card(data, elementTemplate, () => {
    handleCardClick(card);
  });
  return card;
}

// Наполнение страницы карточками

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardsList.addItem(createNewCard(data).generateCard());
    }
  }, elementsSelector);

cardsList.rendererItems();

// Popup с изображением карточки

export const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();

// Popup добавления карточки

const popupAdd = new PopupWithForm('.popup_add', (formData) => {
  cardsList.addItem(createNewCard(formData).generateCard());
})

popupAdd.setEventListeners();

profileButtonAdd.addEventListener('click', () => {
  addFormValidator.disableSubmitButton();
  popupAdd.open();
});

// Popup редактирование профиля

const userInfo = new UserInfo(
  {
    userName: '.profile__name',
    userAbout: '.profile__about',
  })

const popupEdit = new PopupWithForm('.popup_edit', (formData) => {
  userInfo.setUserInfo(formData);
})

popupEdit.setEventListeners();

profileButtonEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo()
  popupEdit._popup.querySelector('.form__input_type_name').value = userData.name;
  popupEdit._popup.querySelector('.form__input_type_about').value = userData.about;
  editFormValidator.disableSubmitButton();
  popupEdit.open();
});

// Установка валидации на формы

const addFormValidator = new FormValidator(validationConfig, popupAdd.getForm());
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(validationConfig, popupEdit.getForm());
editFormValidator.enableValidation();