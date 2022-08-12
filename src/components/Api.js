export default class Api {

  constructor(options){
    this._baseUrl = options.baseUrl;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers['Content-Type'];
  }

  _getJsonOrError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getHeaders() {
    return {
        authorization: this._authorization,
        'Content-Type': this._contentType
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders()
    })
      .then(res => this._getJsonOrError(res))
  }

  setUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
      .then(res => this._getJsonOrError(res))
  }

  setAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: avatar,
      })
    })
      .then(res => this._getJsonOrError(res))
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders()
    })
      .then(res => this._getJsonOrError(res))
  }
  
  addCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(res => this._getJsonOrError(res))
  }

  delCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
      .then(res => this._getJsonOrError(res))
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._getHeaders(),
    })
      .then(res => this._getJsonOrError(res))
  }

  delLikes(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
      .then(res => this._getJsonOrError(res))
  }


}