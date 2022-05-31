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
const profileEditBtn = profile.querySelector('.profile__edit-button')
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');

const popup = document.querySelector('.popup');
const formCloseBtn = popup.querySelector('.popup__close');
const formSaveBtn = popup.querySelector('.popup__button');
const editName = popup.querySelector('.popup__item_type_name');
const editAbout = popup.querySelector('.popup__item_type_about');

const elementTemplate = document.querySelector('#element').content;
const elements = page.querySelector('.elements');

const form = document.querySelector('#form');
const profileAddBtn = profile.querySelector('.profile__add-button')

// Попап редактирование профиля

function openPopup() {
  editName.value = profileName.textContent;
  editAbout.value = profileAbout.textContent;
  popup.classList.add('popup_visible');
}

function closePopup() {
  popup.classList.remove('popup_visible');
}

function savePopup(evt) {  
  evt.preventDefault();
  profileName.textContent = editName.value;
  profileAbout.textContent = editAbout.value;
  closePopup()
}

profileEditBtn.addEventListener('click', openPopup);
formCloseBtn.addEventListener('click', closePopup);
formSaveBtn.addEventListener('click', savePopup);

// Наполнение страницы карточками

for (const item of initialCards) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = item.link;
  element.querySelector('.element__image').alt = item.name;
  element.querySelector('.element__title').textContent = item.name;
  elements.append(element);
}

// Попап добавления нового места

function openForm() {
  form.classList.add('popup_visible');
}

function closeForm() {
  form.classList.remove('popup_visible');
}

profileAddBtn.addEventListener('click', openForm);
formCloseBtn.addEventListener('click', closeForm);