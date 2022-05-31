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

const popupEdit = document.querySelector('.popup__form_type_edit');
const formCloseBtn = popupEdit.querySelector('.popup__close');
const formSaveBtn = popupEdit.querySelector('.popup__button');
const editName = popupEdit.querySelector('.popup__item_type_name');
const editAbout = popupEdit.querySelector('.popup__item_type_about');

const elementTemplate = document.querySelector('#element').content;
const elements = page.querySelector('.elements');

const profileAddBtn = profile.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup__form_type_add');
const formAddCloseBtn = popupAdd.querySelector('.popup__close');
const formAddSaveBtn = popupAdd.querySelector('.popup__button');
const editAddTitle = popupAdd.querySelector('.popup__item_type_title');
const editAddUrl = popupAdd.querySelector('.popup__item_type_url');

// Попап редактирование профиля

function openPopup() {
  editName.value = profileName.textContent;
  editAbout.value = profileAbout.textContent;
  popupEdit.classList.add('popup_visible');
}

function closePopup() {
  popupEdit.classList.remove('popup_visible');
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

function addElement(item) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = item.link;
  element.querySelector('.element__image').alt = item.name;
  element.querySelector('.element__title').textContent = item.name;
  element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  }); 
  return element;
}

for (const item of initialCards) {
  elements.append(addElement(item));
}

// Попап добавления нового места

function openPopupAdd() {
  editAddTitle.value = 'Вид на горы';
  editAddUrl.value = 'https://images.unsplash.com/photo-1653754070622-0d6041a063cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60';
  popupAdd.classList.add('popup_visible');
}

function closePopupAdd() {
  popupAdd.classList.remove('popup_visible');
}

function savePopupAdd(evt) {  
  evt.preventDefault();
  const item = {}
  item.name = editAddTitle.value;
  item.link = editAddUrl.value;
  elements.prepend(addElement(item));
  closePopupAdd()
}

profileAddBtn.addEventListener('click', openPopupAdd);
formAddCloseBtn.addEventListener('click', closePopupAdd);
formAddSaveBtn.addEventListener('click', savePopupAdd);
