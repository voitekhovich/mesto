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
  formList
} from '../utils/constants.js';

function handleCardClick(card) {
  popupImage.open({src: card._link, alt: card._name});
}

// Наполнение страницы карточками

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, elementTemplate, () => {
          handleCardClick(card);
        });

      cardsList.addItem(card.generateCard());
    }
  }, elementsSelector);

cardsList.rendererItems();

// Установка валидации на формы

formList.forEach((formElement) => {
  const validator = new FormValidator(validationConfig, formElement);
  validator.enableValidation();
});

// Popup с изображением карточки

export const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();

// Popup добавления карточки

const popupAdd = new PopupWithForm('.popup_add', (formData) => {
  const data = {
    link: formData['link-input'],
    name: formData['title-input']
  };
  const card = new Card(data, elementTemplate, () => {
    handleCardClick(card);
  });

  cardsList.addItem(card.generateCard());
})

popupAdd.setEventListeners();

profileButtonAdd.addEventListener('click', () => {
  FormValidator.setSubmitButtonDisable(popupAdd._selector.querySelector('.form__submit'));
  popupAdd.open();
});

// Popup редактирование профиля

const userInfo = new UserInfo(
  {
    userName: '.profile__name',
    userAbout: '.profile__about',
  })

const popupEdit = new PopupWithForm('.popup_edit', (formData) => {
  userInfo.setUserInfo({
    name: formData['name-input'],
    about: formData['about-input']
  });
})

popupEdit.setEventListeners();

profileButtonEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo()
  popupEdit._selector.querySelector('.form__input_type_name').value = userData.name;
  popupEdit._selector.querySelector('.form__input_type_about').value = userData.about;
  FormValidator.setSubmitButtonDisable(popupEdit._selector.querySelector('.form__submit'));
  popupEdit.open();
});