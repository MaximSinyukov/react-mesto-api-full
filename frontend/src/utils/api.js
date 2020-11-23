import {config} from './constants';

class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }

  _handleResponse(response){
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.statusText);
    }
  }

  getUser() {
    return fetch(`${this.url}/users/me`, { headers: this.headers})
      .then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, { headers: this.headers})
      .then(this._handleResponse);
  }

  updateProfileInfo(data) {
    return fetch(`${this.url}/users/me`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          about: data.object
        })
      }
    )
      .then(this._handleResponse);
  }

  updateProfileAvatar(data) {
    return fetch(`${this.url}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: data.avatar
        })
      }
    )
      .then(this._handleResponse);
  }

  createCard(data) {
    return fetch(`${this.url}/cards`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          link: data.object
        })
      }
    )
      .then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`,
      {
        method: 'DELETE',
        headers: this.headers
      }
    )
      .then(this._handleResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this.url}/cards/likes/${id}`,
      {
        method: 'PUT',
        headers: this.headers
      }
    )
      .then(this._handleResponse);
    } else {
      return fetch(`${this.url}/cards/likes/${id}`,
      {
        method: 'DELETE',
        headers: this.headers
      }
    )
      .then(this._handleResponse);
    }
  }

  registerUser(data) {
    return fetch(`${this.url}/sign-up`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      }
    )
    .then(this._handleResponse);
  }

  loginUser(data) {
    return fetch(`${this.url}/sign-in`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          password: data.password,
          email: data.email
        })
      }
    )
    .then(this._handleResponse);
  }

  logoutUser() {
    return fetch(`${this.url}/sign-out`, { headers: this.headers})
    .then(this._handleResponse);
  }
}

const api = new Api(config);

export default api;
