export default class UserInfo {

  constructor(selectors){
    this._elementName = document.querySelector(selectors.userName);
    this._elementAbout = document.querySelector(selectors.userAbout);
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
  }

}