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

    addCard(name,link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this.headers,
            credentials: 'include',
            body: JSON.stringify({
              name: name,
              link: link
            }),
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
    setUserInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
            credentials: 'include',
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(name, about ),
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
    setUserAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this.headers,
            body: JSON.stringify({avatar}),
        }).then((res) => {
            return this._check(res)
        });
    }
    changeLikeCardStatus(id, cardIsLiked){
      return fetch(`${this._url}/cards/${id}/likes`, {
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