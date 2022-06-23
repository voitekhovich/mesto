const page = document.querySelector('.page');

const profile = page.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileButtonEdit = profile.querySelector('.profile__edit-button')
const profileButtonAdd = profile.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_edit');
const formEditButtonSave = popupEdit.querySelector('.form__submit');
const formEditInputName = popupEdit.querySelector('.form__input_type_name');
const formEditInputAbout = popupEdit.querySelector('.form__input_type_about');

const popupFormAdd = document.querySelector('.popup_add');
const formAddButtonSave = popupFormAdd.querySelector('.form__submit');
const formAdd = popupFormAdd.querySelector('.popup__form');
const formAddInputTitle = popupFormAdd.querySelector('.form__input_type_title');
const formAddInputLink = popupFormAdd.querySelector('.form__input_type_link');

const popupImage = document.querySelector('.popup_image');
const imageboxImg = popupImage.querySelector('.imagebox__img');
const imageboxCaption = popupImage.querySelector('.imagebox__caption');

// Наполнение страницы карточками

const elementsList = page.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template')
  .content.querySelector('.element');
const getElementByEvent = e => e.currentTarget.closest('.element');

const likeElement = evt => {
  evt.currentTarget.classList.toggle('element__like_active');
};

const removeElement = evt => {
  getElementByEvent(evt).remove();
};

const addElementListeners = element => {
  element.querySelector('.element__like').addEventListener('click', likeElement);
  element.querySelector('.element__trash').addEventListener('click', removeElement);
  element.querySelector('.element__image').addEventListener('click', openPopupImage);
}

const createElement = data => {
  const element = elementTemplate.cloneNode(true);
  const elementImage = element.querySelector('.element__image');

  elementImage.src = data.link;
  elementImage.alt = data.name;
  element.querySelector('.element__title').textContent = data.name;
  
  addElementListeners(element);

  return element;
}

const addElement = element => {
  elementsList.prepend(element);
}

initialCards.reverse().forEach(data => {
  addElement(createElement(data));
});

// Popups

function closeByEscape(evt) {
  if (evt.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_visible');
    closePopup(openedPopup);
    
  }
}

const closeByOverlay = (evt) => {
  if (evt.target.classList.contains('popup_visible')){
    closePopup(evt.target);
  }
}

const openPopup = popup => {
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', closeByEscape);
}

const closePopup = popup => {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', closeByEscape);
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_visible')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
})

function setSubmitButtonDisable(submitButton) {
  submitButton.setAttribute('disabled', 'disabled');
  submitButton.classList.add('form__submit_inactive');
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
  setSubmitButtonDisable(formEditButtonSave);
  closePopup(popupEdit);
}

profileButtonEdit.addEventListener('click', openPopupEdit);
formEditButtonSave.addEventListener('click', savePopupEdit);

// Popup добавления карточки

function openPopupAdd() {
  formAdd.reset();
  setSubmitButtonDisable(formAddButtonSave);
  openPopup(popupFormAdd);
}

function savePopupAdd(evt) {  
  evt.preventDefault();
  addElement(createElement(
    {
    name: formAddInputTitle.value,
    link: formAddInputLink.value,
  }));
  closePopup(popupFormAdd);
}

profileButtonAdd.addEventListener('click', openPopupAdd);
formAddButtonSave.addEventListener('click', savePopupAdd);

// Popup c картинкой

function openPopupImage(evt) {
  imageboxImg.src = evt.currentTarget.src;
  imageboxImg.alt = evt.currentTarget.alt;
  imageboxCaption.textContent = evt.currentTarget.alt;
  openPopup(popupImage)
}