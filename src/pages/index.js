import '../pages/index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import {
  elementsSelector,
  validationConfig,
  elementTemplate,
  profileButtonEdit,
  profileButtonAdd,
  profileAvatarEdit,
  token,
  baseUrl
} from '../utils/constants.js';

const api = new Api(
  {
    baseUrl: baseUrl,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  }
)

// Popup редактирование профиля

const userInfo = new UserInfo(
  {
    userName: '.profile__name',
    userAbout: '.profile__about',
    userAvatart: '.profile__avatar',
  })

api.getOwnerUser()
  .then(data => {
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

// Popup изменения аватара

function userAvatarUpdate(newData) {
  api.setAvatar(newData.avatar)
    .then(data => {
      userInfo.setUserAvatar(data);
    })
}

const popupAvatar = new PopupWithForm('.popup_avatar', formData => userAvatarUpdate(formData))
popupAvatar.setEventListeners();

profileAvatarEdit.addEventListener('click', () => {
  editFormAvatarValidator.disableSubmitButton();
  popupAvatar.open();
});

// Наполнение страницы карточками

function getOwnerTrash(card) {
  return card._data.owner._id === userInfo.getUserId();
}

function getOwnerLike(card) {
  const isLike = card._data.likes.find(item => item._id === userInfo.getUserId());
  if (isLike) {
    card.setLike();
  } else {
    card.removeLike();
  }
}

function setCardLiked(card) {
  if (card._isOwenLiked) {
    api.delLikes(card._data._id)
      .then(data => {
        card.setLikesCount(data.likes.length);
        card.removeLike();
    })
    card._element.querySelector('.element__like').classList.remove('element__like_active');
  } else {
    api.setLikes(card._data._id)
      .then(data => {
        card.setLikesCount(data.likes.length);
        card.setLike();
      })
    card._element.querySelector('.element__like').classList.add('element__like_active');
  }
}

function createNewCard(data){
  const card = new Card(data, elementTemplate,
    () => popupImage.open({src: card._data.link, alt: card._data.name}),
    () => popupDelete.open(card),
    () => getOwnerTrash(card),
    () => getOwnerLike(card),
    () => setCardLiked(card),
  );
  return card.generateCard();
}

const cardsList = new Section(
  {
    items: [],
    renderer: data => cardsList.addItem(createNewCard(data))
  }, elementsSelector);

api.getInitialCards()
  .then(data => {
    cardsList.setItems(data.reverse());
    cardsList.rendererItems();
    // console.log(data);
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

const popupAdd = new PopupWithForm('.popup_add', formData => addNewCard(formData))

popupAdd.setEventListeners();

profileButtonAdd.addEventListener('click', () => {
  addFormValidator.disableSubmitButton();
  popupAdd.open();
});

// Popup удаления карточки

const popupDelete = new PopupWithConfirmation(
  '.popup_del',
  (card) => {
    api.delCard(card._data._id)
      .then(data => {
        card._element.remove();
      })
    }
)

popupDelete.setEventListeners();

// Установка валидации на формы

const addFormValidator = new FormValidator(validationConfig, popupAdd.getForm());
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(validationConfig, popupEdit.getForm());
editFormValidator.enableValidation();

const editFormAvatarValidator = new FormValidator(validationConfig, popupAvatar.getForm());
editFormAvatarValidator.enableValidation();