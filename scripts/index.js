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
