import '../pages/index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  elementsSelector,
  validationConfig,
  elementTemplate,
  profileButtonEdit,
  profileButtonAdd,
  token,
  baseUrl
} from '../utils/constants.js';

const api = new Api({
  baseUrl: baseUrl,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
})

function handleCardClick(card) {
  popupImage.open({src: card._link, alt: card._name});
}

function createNewCard(data){
  const card = new Card(data, elementTemplate, () => {
    handleCardClick(card);
  });
  return card.generateCard();
}

// Наполнение страницы карточками

const cardsList = new Section(
  {
    items: [],
    renderer: (data) => {
      cardsList.addItem(createNewCard(data));
    }
  }, elementsSelector);

// cardsList.rendererItems();

// function initialCards(dataCards) {
//   const cardsList = new Section(
//     {
//       items: dataCards,
//       renderer: (data) => {
//         cardsList.addItem(createNewCard(data));
//       }
//     }, elementsSelector);
  
//   cardsList.rendererItems();
// }

api.getInitialCards()
  .then(data => {
    cardsList.setItems(data);
    cardsList.rendererItems();
  })

// Popup с изображением карточки

export const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();

// Popup добавления карточки

function addNewCard(card) {
  api.setCard(card)
    .then(data => {
      cardsList.addItem(createNewCard(data));
    })
}

const popupAdd = new PopupWithForm('.popup_add', (formData) => {
  // cardsList.addItem(createNewCard(formData));
  addNewCard(formData);
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
    userAvatart: '.profile__avatar',
  })

api.getOwnerUser()
  .then(data => {
    // console.log(data);
    userInfo.setUserInfo(data);
    userInfo.setUserAvatar(data);
  })

function userDataUpdate(newData) {
  api.setOwnerUser(newData)
    .then(data => {
      userInfo.setUserInfo(data);
    })
}

const popupEdit = new PopupWithForm('.popup_edit', (formData) => {
  // userInfo.setUserInfo(formData);
  userDataUpdate(formData);
})

popupEdit.setEventListeners();
const inputName = popupEdit._popup.querySelector('.form__input_type_name');
const inputAbout = popupEdit._popup.querySelector('.form__input_type_about');

profileButtonEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo()
  inputName.value = userData.name;
  inputAbout.value = userData.about;
  editFormValidator.disableSubmitButton();
  popupEdit.open();
});

// Установка валидации на формы

const addFormValidator = new FormValidator(validationConfig, popupAdd.getForm());
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(validationConfig, popupEdit.getForm());
editFormValidator.enableValidation();