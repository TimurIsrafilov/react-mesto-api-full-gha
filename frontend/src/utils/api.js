class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://api.itf.nomoredomains.monster",
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(this._getResponseData)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://api.itf.nomoredomains.monster",
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(this._getResponseData)
  }

  editProfileInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://api.itf.nomoredomains.monster",
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
    .then(this._getResponseData)
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://api.itf.nomoredomains.monster",
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
    .then(this._getResponseData)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://api.itf.nomoredomains.monster",
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(this._getResponseData)
  }

  changeLikeCardStatus(id, like) {
    const selectMethod = like ? "DELETE" : "PUT";
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: selectMethod,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://api.itf.nomoredomains.monster",
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(this._getResponseData)
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://api.itf.nomoredomains.monster",
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        avatar,
      }),
    })
    .then(this._getResponseData)
  }
}

const api = new Api({
  baseUrl: "https://api.itf.nomoredomains.monster",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://api.itf.nomoredomains.monster",
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default api;
