const popups = document.querySelectorAll('.popup');
const popupImage = document.querySelector('.popup_image');
const imageboxImg = popupImage.querySelector('.imagebox__img');
const imageboxCaption = popupImage.querySelector('.imagebox__caption');

// Popups

function closeByEscape(evt) {
  if (evt.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_visible');
    closePopup(openedPopup);
    
  }
}

export const openPopup = popup => {
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', closeByEscape);
}

export const closePopup = popup => {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', closeByEscape);
}

// Popup c картинкой

export function openPopupImage(evt) {
  imageboxImg.src = evt.currentTarget.src;
  imageboxImg.alt = evt.currentTarget.alt;
  imageboxCaption.textContent = evt.currentTarget.alt;
  openPopup(popupImage)
}

// Навешивание слушателей закрытия Popup

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_visible') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
})