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
    return Promise.reject({status: res.status});
  }

  _getHeaders() {
    return {
        authorization: this._authorization,
        'Content-Type': this._contentType
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders()
    })
      .then(res => {
        return this._getJsonOrError(res)
      })
  }

  getOwnerUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders()
    })
      .then(res => {
        return this._getJsonOrError(res)
      })
  }

  setOwnerUser(newData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: newData.name,
        about: newData.about
      })
    })
      .then(res => {
        return this._getJsonOrError(res)
      })
  }

  setCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(res => {
        return this._getJsonOrError(res)
      })
  }

  delCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
      .then(res => {
        return this._getJsonOrError(res)
      })
  }

  setLikes(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._getHeaders(),
    })
      .then(res => {
        return this._getJsonOrError(res)
      })
  }

  delLikes(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
      .then(res => {
        return this._getJsonOrError(res)
      })
  }

}