const page = document.querySelector('.page');

const profile = page.querySelector('.profile');
const profileEditBtn = profile.querySelector('.profile__edit-button')
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');

const popup = document.querySelector('.popup');
const formCloseBtn = popup.querySelector('.form__close');
const formSaveBtn = popup.querySelector('.form__save');
let editName = popup.querySelector('.form__name');
let editAbout = popup.querySelector('.form__about');

function openPopup() {
  popup.classList.add('popup_visible');
  editName.value = profileName.textContent;
  editAbout.value = profileAbout.textContent;
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
