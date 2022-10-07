const { URL, REACT_ENV } = process.env;

class Api {
  constructor({ baseUrl, headers, credentials }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._credentials = credentials;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: this._credentials,
    })
    .then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
      credentials: this._credentials,
    })
    .then(this._checkResponse);
  }

  editProfile(newData) {
   return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify(newData),
    })
    .then(this._checkResponse);
  }

  addCard(newCard) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify(newCard),
    })
    .then(this._checkResponse);
  }

  deleteCard(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: this._credentials,
    })
    .then(this._checkResponse);
  }

  likePost(idCard, isLike) {
    const method = isLike ? 'PUT' : 'DELETE';
    return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
      method: method,
      headers: this._headers,
      credentials: this._credentials,
    })
    .then(this._checkResponse);
  }

  changeAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({ avatar: avatarLink }),
    })
      .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: REACT_ENV === 'production'
    ? URL
    :'http://localhost:3005',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
});

export default api;