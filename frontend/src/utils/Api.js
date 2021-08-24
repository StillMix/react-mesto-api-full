class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    _check(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject("Произошла ошибка");
        }
    }
    getCards() {
        return fetch(`${this._url}/cards/`, {
          credentials: 'include',
            headers: this.headers,
        }).then((res) => {
            return this._check(res)

        });
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this.headers,
            body: JSON.stringify(data),
        }).then((res) => {
            return this._check(res)
        });
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this.headers,
        }).then((res) => {
            return this._check(res)
        });
    }
    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this.headers,
            body: JSON.stringify(data),
        }).then((res) => {
            return this._check(res)
        });
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
          credentials: 'include',
                headers: this.headers,
            })
            .then((res) => {
                return this._check(res)
            })
    }
    setUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this.headers,
            body: JSON.stringify(data),
        }).then((res) => {
            return this._check(res)
        });
    }
    changeLikeCardStatus(id, cardIsLiked){
      return fetch(`${this._url}/cards/likes/${id}`, {
        method: cardIsLiked ? "PUT" : "DELETE",
        credentials: 'include',
        headers: this.headers,
    }).then((res) => {
        return this._check(res)
    });
    }
}

const api = new Api({
    url: 'http://SMBackendMesto.nomoredomains.rocks',
    headers: {
      'Content-Type': 'application/json',
    }
})

export default api;