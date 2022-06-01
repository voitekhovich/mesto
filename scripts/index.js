const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const page = document.querySelector('.page');

const profile = page.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileButtonEdit = profile.querySelector('.profile__edit-button')
const profileButtonAdd = profile.querySelector('.profile__add-button');

const popupFormEdit = document.querySelector('.popup_form_edit');
const formEditButtonClose = popupFormEdit.querySelector('.popup__close');
const formEditButtonSave = popupFormEdit.querySelector('.popup__button');
const formEditInputName = popupFormEdit.querySelector('.popup__item_type_name');
const formEditInputAbout = popupFormEdit.querySelector('.popup__item_type_about');

const popupFormAdd = document.querySelector('.popup_form_add');
const formAddButtonClose = popupFormAdd.querySelector('.popup__close');
const formAddButtonSave = popupFormAdd.querySelector('.popup__button');
const formAddInputTitle = popupFormAdd.querySelector('.popup__item_type_title');
const formAddInputLink = popupFormAdd.querySelector('.popup__item_type_link');

const popupImage = document.querySelector('.popup_image');
const formImageButtonClose = popupImage.querySelector('.popup__close');

// Наполнение страницы карточками

const elementsList = page.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template');
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
  const element = elementTemplate.content
    .querySelector('.element')
    .cloneNode(true);

  element.querySelector('.element__image').src = data.link;
  element.querySelector('.element__image').alt = data.name;
  element.querySelector('.element__title').textContent = data.name;
  
  addElementListeners(element);

  return element;
}

const addElement = data => {
  const element = createElement(data);
  elementsList.append(element);
}

initialCards.forEach(addElement);

// Popups

const getPopupByEvent = evt => evt.currentTarget.closest('.popup');

const popupOpen = popapName => {
  popapName.classList.add('popup_visible');
}

const popupClose = evt => {
  getPopupByEvent(evt).classList.remove('popup_visible');
}

// Popup редактирование профиля

function openPopupEdit() {
  formEditInputName.value = profileName.textContent;
  formEditInputAbout.value = profileAbout.textContent;
  popupOpen(popupFormEdit);
}

function savePopupEdit(evt) {  
  evt.preventDefault();
  profileName.textContent = formEditInputName.value;
  profileAbout.textContent = formEditInputAbout.value;
  popupClose(evt);
}

profileButtonEdit.addEventListener('click', openPopupEdit);
formEditButtonClose.addEventListener('click', popupClose);
formEditButtonSave.addEventListener('click', savePopupEdit);

// Popup добавления карточки

function openPopupAdd() {
  formAddInputTitle.value = '';
  formAddInputLink.value = '';
  popupOpen(popupFormAdd);
}

function savePopupAdd(evt) {  
  evt.preventDefault();
  elementsList.prepend(createElement(
    {
      name: formAddInputTitle.value,
      link: formAddInputLink.value,
    }
  ));
  popupClose(evt);
}

profileButtonAdd.addEventListener('click', openPopupAdd);
formAddButtonClose.addEventListener('click', popupClose);
formAddButtonSave.addEventListener('click', savePopupAdd);

// Popup c картинкой

function openPopupImage(evt) {
  popupImage.querySelector('.imagebox__img').src = evt.currentTarget.src;
  popupImage.querySelector('.imagebox__img').alt = evt.currentTarget.alt;
  popupImage.querySelector('.imagebox__caption').textContent = evt.currentTarget.alt;
  popupOpen(popupImage)
}

popupImage.addEventListener('click', popupClose);