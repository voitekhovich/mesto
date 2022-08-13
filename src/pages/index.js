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
  baseUrl,
  headers,
  elementTemplate,
  profileButtonEdit,
  profileButtonAdd,
  profileAvatarEdit,
  userProfileSelectors,
  popupList,
  formInputList
} from '../utils/constants.js';

const api = new Api({baseUrl, headers});
const userInfo = new UserInfo(userProfileSelectors)

function errorOutput(err) {
  console.log(err);
}

// Popup редактирование профиля

const popupEdit = new PopupWithForm(popupList.popupEdit, (formData) => {
  updateUserInfo(formData);
});
popupEdit.setEventListeners();

const inputName = popupEdit.getPopup().querySelector(formInputList.inputName);
const inputAbout = popupEdit.getPopup().querySelector(formInputList.inputAbout);

function updateUserInfo(newData) {
  editFormValidator.disableSubmitButton();
  api.setUserInfo(newData)
    .then(data => {
      userInfo.setUserInfo(data);
      popupEdit.close();
    })
    .catch((err) => errorOutput(err))
    .finally(() => popupEdit.renderLoading(false))
}

profileButtonEdit.addEventListener('click', () => {
  inputName.value = userInfo.getUserInfo().name;
  inputAbout.value = userInfo.getUserInfo().about;
  editFormValidator.disableSubmitButton();
  popupEdit.open();
});

// Popup изменения аватара

const popupAvatar = new PopupWithForm(popupList.popupAvatar, formData => {
  updateUserAvatar(formData);
})
popupAvatar.setEventListeners();

function updateUserAvatar(userData) {
  editFormAvatarValidator.disableSubmitButton();
  api.setAvatar(userData.avatar)
    .then(data => {
      userInfo.setAvatar(data);
      popupAvatar.close();
    })
    .catch((err) => errorOutput(err))
    .finally(() => popupAvatar.renderLoading(false))
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
  return card.data.owner._id === userInfo.getId();
}

function isOwnerLike(card) {
  const isLike = card.data.likes.find(item => item._id === userInfo.getId());
  if (isLike) {
    card.setLike();
  } else {
    card.delLike();
  }
}

function setLike(card) {
  if (card.isOwenLiked) {
    api.delLikes(card.data._id)
      .then(data => {
        card.setLikeCount(data.likes.length);
        card.delLike();
      })
      .catch((err) => errorOutput(err))
  } else {
    api.setLike(card.data._id)
      .then(data => {
        card.setLikeCount(data.likes.length);
        card.setLike();
      })
      .catch((err) => errorOutput(err))
  }
}

function createNewCard(data){
  const card = new Card(data, elementTemplate,
    () => popupImage.open({src: card.data.link, alt: card.data.name}),
    () => popupDelete.open(card),
    () => isOwnerTrash(card),
    () => isOwnerLike(card),
    () => setLike(card),
  );
  return card.generateCard();
}

// Начальная инициализация страницы

Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),
])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    userInfo.setAvatar(user);

    cardsList.setItems(cards.reverse());
    cardsList.rendererItems();
  })
  .catch((err) => errorOutput(err))

// Popup с изображением карточки

export const popupImage = new PopupWithImage(popupList.popupImage);
popupImage.setEventListeners();

// Popup добавления карточки

const popupAdd = new PopupWithForm(popupList.popupAdd, formData => addNewCard(formData));
popupAdd.setEventListeners();

function addNewCard(card) {
  addFormValidator.disableSubmitButton();
  api.addCard(card)
    .then(data => {
      cardsList.addItem(createNewCard(data));
      popupAdd.close();
    })
    .catch((err) => errorOutput(err))
    .finally(() => popupAdd.renderLoading(false))
}

profileButtonAdd.addEventListener('click', () => {
  addFormValidator.disableSubmitButton();
  popupAdd.open();
});

// Popup удаления карточки

const popupDelete = new PopupWithConfirmation(popupList.popupDel,
  (card) => {
    api.delCard(card.data._id)
      .then(data => {
        card.element.remove();
        popupDelete.close();
    })
    .catch((err) => errorOutput(err))
    .finally(() => popupDelete.renderLoading(false))
  }
)

popupDelete.setEventListeners();

// Установка валидации на формы

const addFormValidator = new FormValidator(validationConfig, popupAdd.form);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(validationConfig, popupEdit.form);
editFormValidator.enableValidation();

const editFormAvatarValidator = new FormValidator(validationConfig, popupAvatar.form);
editFormAvatarValidator.enableValidation();