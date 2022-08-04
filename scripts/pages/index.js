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
  formList
} from '../utils/constants.js';

const page = document.querySelector('.page');

const profile = page.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileButtonEdit = profile.querySelector('.profile__edit-button')
const profileButtonAdd = profile.querySelector('.profile__add-button');

const popupEditForm = document.querySelector('.popup_edit');
const formEditInputName = popupEditForm.querySelector('.form__input_type_name');
const formEditInputAbout = popupEditForm.querySelector('.form__input_type_about');

// Наполнение страницы карточками

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(
        data.link,
        data.name,
        elementTemplate, () => {
          popupImage.open({src: card._link, alt: card._name});
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

profileButtonAdd.addEventListener('click', () => {
  // FormValidator.setSubmitButtonDisable(this._selector.querySelector('.form__submit'));
  popupAdd.open();
});

const popupAdd = new PopupWithForm('.popup_add', (formData) => {
  const card = new Card(formData['link-input'], formData['title-input'], elementTemplate);
  cardsList.addItem(card.generateCard());
})
popupAdd.setEventListeners();

// Popup редактирование профиля

profileButtonEdit.addEventListener('click', () => {
  formEditInputName.value = userInfo.getUserInfo().name;
  formEditInputAbout.value = userInfo.getUserInfo().about;
  // FormValidator.setSubmitButtonDisable(this._selector.querySelector('.form__submit'));
  popupEdit.open();
});

const userInfo = new UserInfo({
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
