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
  formList
} from '../utils/constants.js';

const api = new Api({baseUrl, headers});
const userInfo = new UserInfo(userProfileSelectors)

function handleError(err) {
  console.log(err);
}

// Popup редактирование профиля

const popupEdit = new PopupWithForm(popupList.popupEdit, (formData) => {
  updateUserInfo(formData);
});
popupEdit.setEventListeners();

function updateUserInfo(newData) {
  formValidators[formList.editForm].disableSubmitButton();
  api.setUserInfo(newData)
    .then(data => {
      userInfo.setUserInfo(data);
      popupEdit.close();
    })
    .catch((err) => handleError(err))
    .finally(() => {
      popupEdit.renderLoading(false);
      formValidators[formList.editForm].enableSubmitButton();
    })
}

profileButtonEdit.addEventListener('click', () => {
  popupEdit.setInputValues(userInfo.getUserInfo())
  formValidators[formList.editForm].resetValidation();
  popupEdit.open();
});

// Popup изменения аватара

const popupAvatar = new PopupWithForm(popupList.popupAvatar, formData => {
  updateUserAvatar(formData);
})
popupAvatar.setEventListeners();

function updateUserAvatar(userData) {
  formValidators[formList.editAvatarForm].disableSubmitButton();
  api.setAvatar(userData.avatar)
    .then(data => {
      userInfo.setUserInfo(data);
      popupAvatar.close();
    })
    .catch((err) => handleError(err))
    .finally(() => {
      popupAvatar.renderLoading(false);
      formValidators[formList.editAvatarForm].enableSubmitButton();
    })
}

profileAvatarEdit.addEventListener('click', () => {
  formValidators[formList.editAvatarForm].resetValidation();
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
      .catch((err) => handleError(err))
  } else {
    api.setLike(card.data._id)
      .then(data => {
        card.setLikeCount(data.likes.length);
        card.setLike();
      })
      .catch((err) => handleError(err))
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

    cardsList.setItems(cards.reverse());
    cardsList.rendererItems();
  })
  .catch((err) => handleError(err))

// Popup с изображением карточки

export const popupImage = new PopupWithImage(popupList.popupImage);
popupImage.setEventListeners();

// Popup добавления карточки

const popupAdd = new PopupWithForm(popupList.popupAdd, formData => addNewCard(formData));
popupAdd.setEventListeners();

function addNewCard(card) {
  formValidators[formList.addForm].disableSubmitButton();
  api.addCard(card)
    .then(data => {
      cardsList.addItem(createNewCard(data));
      popupAdd.close();
    })
    .catch((err) => handleError(err))
    .finally(() => {
      popupAdd.renderLoading(false);
      formValidators[formList.addForm].enableSubmitButton();
    })
}

profileButtonAdd.addEventListener('click', () => {
  formValidators[formList.addForm].resetValidation();
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
    .catch((err) => handleError(err))
    .finally(() => popupDelete.renderLoading(false))
  }
)

popupDelete.setEventListeners();

// Установка валидации на формы

const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);