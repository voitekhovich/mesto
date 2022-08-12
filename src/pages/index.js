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
  apiOptions,
  elementTemplate,
  profileButtonEdit,
  profileButtonAdd,
  profileAvatarEdit,
  userProfileSelectors,
} from '../utils/constants.js';

const api = new Api(apiOptions);
const userInfo = new UserInfo(userProfileSelectors)

function errorOutput(err) {
  console.log(err);
}

// Popup редактирование профиля

const popupEdit = new PopupWithForm('.popup_edit', (formData) => {
  updateUserInfo(formData);
});
popupEdit.setEventListeners();

const inputName = popupEdit.getPopup().querySelector('.form__input_type_name');
const inputAbout = popupEdit.getPopup().querySelector('.form__input_type_about');

function updateUserInfo(newData) {
  editFormValidator.disableSubmitButton();
  api.setUserInfo(newData)
    .then(data => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => errorOutput(err))
    .finally(() => {
      popupEdit.close();
    })
}

api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo(data);
    userInfo.setAvatar(data);
  })
  .catch((err) => errorOutput(err))

profileButtonEdit.addEventListener('click', () => {
  inputName.value = userInfo.getUserInfo().name;
  inputAbout.value = userInfo.getUserInfo().about;
  editFormValidator.disableSubmitButton();
  popupEdit.open();
});

// Popup изменения аватара

const popupAvatar = new PopupWithForm('.popup_avatar', formData => {
  updateUserAvatar(formData);
})
popupAvatar.setEventListeners();

function updateUserAvatar(userData) {
  editFormAvatarValidator.disableSubmitButton();
  api.setAvatar(userData.avatar)
    .then(data => {
      userInfo.setAvatar(data);
    })
    .catch((err) => errorOutput(err))
    .finally(() => {
      popupAvatar.close();
    })
}

profileAvatarEdit.addEventListener('click', () => {
  editFormAvatarValidator.disableSubmitButton();
  popupAvatar.open();
});

// Наполнение страницы карточками

const cardsList = new Section(
  {
    items: [],
    renderer: data => cardsList.addItem(createNewCard(data))
  }, elementsSelector);

function isOwnerTrash(card) {
  return card._data.owner._id === userInfo.getId();
}

function isOwnerLike(card) {
  const isLike = card._data.likes.find(item => item._id === userInfo.getId());
  if (isLike) {
    card.setLike();
  } else {
    card.delLike();
  }
}

function setLike(card) {
  if (card._isOwenLiked) {
    api.delLikes(card._data._id)
      .then(data => {
        card.setCountLikes(data.likes.length);
        card.delLike();
      })
      .catch((err) => errorOutput(err))
  } else {
    api.setLike(card._data._id)
      .then(data => {
        card.setCountLikes(data.likes.length);
        card.setLike();
      })
      .catch((err) => errorOutput(err))
  }
}

function createNewCard(data){
  const card = new Card(data, elementTemplate,
    () => popupImage.open({src: card._data.link, alt: card._data.name}),
    () => popupDelete.open(card),
    () => isOwnerTrash(card),
    () => isOwnerLike(card),
    () => setLike(card),
  );
  return card.generateCard();
}

api.getInitialCards()
  .then(data => {
    cardsList.setItems(data.reverse());
    cardsList.rendererItems();
    })
  .catch((err) => errorOutput(err))

// Popup с изображением карточки

export const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();

// Popup добавления карточки

const popupAdd = new PopupWithForm('.popup_add', formData => addNewCard(formData));
popupAdd.setEventListeners();

function addNewCard(card) {
  addFormValidator.disableSubmitButton();
  api.addCard(card)
    .then(data => {
      cardsList.addItem(createNewCard(data));
    })
    .catch((err) => errorOutput(err))
    .finally(() => {
      popupAdd.close();
    })
}

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
    .catch((err) => errorOutput(err))
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