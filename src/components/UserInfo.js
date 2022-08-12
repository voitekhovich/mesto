export default class UserInfo {

  constructor(selectors){
    this._elementName = document.querySelector(selectors.userName);
    this._elementAbout = document.querySelector(selectors.userAbout);
    this._elementAvatar = document.querySelector(selectors.userAvatart);
  }

  getId() {
    return this._id;
  }

  setAvatar(userData) {
    this._elementAvatar.src = userData.avatar;
  }

  getUserInfo() {
    return {
      name: this._elementName.textContent,
      about: this._elementAbout.textContent
    }
  }

  setUserInfo(userData) {
    this._elementName.textContent = userData.name;
    this._elementAbout.textContent = userData.about;
    this._id = userData._id;
  }

}