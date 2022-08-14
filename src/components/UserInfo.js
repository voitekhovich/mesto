export default class UserInfo {

  constructor(selectors){
    this._elementName = document.querySelector(selectors.userName);
    this._elementAbout = document.querySelector(selectors.userAbout);
    this._elementAvatar = document.querySelector(selectors.userAvatart);
  }

  getId() {
    return this._id;
  }

  getUserInfo() {
    return {
      name: this._elementName.textContent,
      about: this._elementAbout.textContent
    }
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._elementName.textContent = name;
    this._elementAbout.textContent = about;
    this._elementAvatar.src = avatar;
    this._id = _id;
  }

}