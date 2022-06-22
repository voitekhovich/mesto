const page = document.querySelector('.page');

const profile = page.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileButtonEdit = profile.querySelector('.profile__edit-button')
const profileButtonAdd = profile.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_edit');
const formEditButtonClose = popupEdit.querySelector('.popup__btn-close');
const formEditButtonSave = popupEdit.querySelector('.form__submit');
const formEditInputName = popupEdit.querySelector('.form__input_type_name');
const formEditInputAbout = popupEdit.querySelector('.form__input_type_about');

const popupFormAdd = document.querySelector('.popup_add');
const formAddButtonClose = popupFormAdd.querySelector('.popup__btn-close');
const formAddButtonSave = popupFormAdd.querySelector('.form__submit');
const formAdd = popupFormAdd.querySelector('.popup__form');
const formAddInputTitle = popupFormAdd.querySelector('.form__input_type_title');
const formAddInputLink = popupFormAdd.querySelector('.form__input_type_link');

const popupImage = document.querySelector('.popup_image');
const formImageButtonClose = popupImage.querySelector('.popup__btn-close');

const btnevents = {
  "edit-form": savePopupEdit,
  "add-form": savePopupAdd,
}

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

const popupImageElement = evt => {
  openPopupImage(evt);
};

const addElementListeners = element => {
  element.querySelector('.element__like').addEventListener('click', likeElement);
  element.querySelector('.element__trash').addEventListener('click', removeElement);
  element.querySelector('.element__image').addEventListener('click', popupImageElement);
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

const escKeyHandler = (evt) => {
  if (evt.key === 'Escape'){
    const popup = document.querySelector('.popup_visible');
    popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', escKeyHandler);
  }
}

const overlayClickHandler = (evt) => {
  if (evt.target.classList.contains('popup_visible')){
    evt.currentTarget.classList.remove('popup_visible');
  }
}

const openPopup = popupName => {
  popupName.classList.add('popup_visible');
  popupName.addEventListener('mousedown', overlayClickHandler);
  document.addEventListener('keydown', escKeyHandler);
}

const closePopup = popupName => {
  popupName.classList.remove('popup_visible');
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
  closePopup(popupEdit);
}

profileButtonEdit.addEventListener('click', openPopupEdit);
formEditButtonClose.addEventListener('click', () => {closePopup(popupEdit)});

// Popup добавления карточки

function openPopupAdd() {
  formAdd.reset();
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
formAddButtonClose.addEventListener('click', () => {closePopup(popupFormAdd)});

// Popup c картинкой

function openPopupImage(evt) {
  const imageboxImg = popupImage.querySelector('.imagebox__img');
  imageboxImg.src = evt.currentTarget.src;
  imageboxImg.alt = evt.currentTarget.alt;
  popupImage.querySelector('.imagebox__caption').textContent = evt.currentTarget.alt;
  openPopup(popupImage)
}

formImageButtonClose.addEventListener('click', () => {closePopup(popupImage)});