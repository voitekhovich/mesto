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

const elementTemplate = document.querySelector('#element').content;
const elements = page.querySelector('.elements');

const profile = page.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileButtonEdit = profile.querySelector('.profile__edit-button')
const profileButtonAdd = profile.querySelector('.profile__add-button');

const popupFormEdit = document.querySelector('.popup__form_type_edit');
const formEditButtonClose = popupFormEdit.querySelector('.popup__close');
const formEditButtonSave = popupFormEdit.querySelector('.popup__button');
const formEditInputName = popupFormEdit.querySelector('.popup__item_type_name');
const formEditInputAbout = popupFormEdit.querySelector('.popup__item_type_about');

const popupFormAdd = document.querySelector('.popup__form_type_add');
const formAddButtonClose = popupFormAdd.querySelector('.popup__close');
const formAddButtonSave = popupFormAdd.querySelector('.popup__button');
const formAddInputTitle = popupFormAdd.querySelector('.popup__item_type_title');
const formAddInputLink = popupFormAdd.querySelector('.popup__item_type_link');

const popupImage = document.querySelector('.popup__image');
const formImageButtonClose = popupImage.querySelector('.popup__close');

// Наполнение страницы карточками

function addElement(item) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = item.link;
  element.querySelector('.element__image').alt = item.name;
  element.querySelector('.element__title').textContent = item.name;
  element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  element.querySelector('.element__trash').addEventListener('click', function (evt) {
    element.remove(evt.target.parentElement);
  });
  element.querySelector('.element__image').addEventListener('click', function (evt) {
    popupImage.querySelector('.imagebox__img').src = item.link;
    popupImage.querySelector('.imagebox__img').alt = item.name;
    popupImage.querySelector('.imagebox__caption').textContent = item.name;
    popupImage.classList.add('popup_visible');
  });

  return element;
}

for (const item of initialCards) {
  elements.append(addElement(item));
}

// Попап редактирование профиля

function openPopupEdit() {
  formEditInputName.value = profileName.textContent;
  formEditInputAbout.value = profileAbout.textContent;
  popupFormEdit.classList.add('popup_visible');
}

function closePopupEdit() {
  popupFormEdit.classList.remove('popup_visible');
}

function savePopupEdit(evt) {  
  evt.preventDefault();
  profileName.textContent = formEditInputName.value;
  profileAbout.textContent = formEditInputAbout.value;
  closePopupEdit()
}

profileButtonEdit.addEventListener('click', openPopupEdit);
formEditButtonClose.addEventListener('click', closePopupEdit);
formEditButtonSave.addEventListener('click', savePopupEdit);

// Попап добавления карточки

function openPopupAdd() {
  formAddInputTitle.value = 'Вид на горы';
  formAddInputLink.value = 'https://images.unsplash.com/photo-1653754070622-0d6041a063cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60';
  popupFormAdd.classList.add('popup_visible');
}

function closePopupAdd() {
  popupFormAdd.classList.remove('popup_visible');
}

function savePopupAdd(evt) {  
  evt.preventDefault();
  elements.prepend(addElement(
    {
      name: formAddInputTitle.value,
      link: formAddInputLink.value,
    }
  ));
  closePopupAdd()
}

profileButtonAdd.addEventListener('click', openPopupAdd);
formAddButtonClose.addEventListener('click', closePopupAdd);
formAddButtonSave.addEventListener('click', savePopupAdd);

// Попап c картинкой

function closePopupImage() {
  popupImage.classList.remove('popup_visible');
}

formImageButtonClose.addEventListener('click', closePopupImage);