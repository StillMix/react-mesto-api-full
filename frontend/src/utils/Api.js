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
    getCards(token) {
        return fetch(`${this._url}/cards/`, {
            headers:
            {'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',},
        }).then((res) => {
            return this._check(res)

        });
    }

    addCard(data,token) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers:
            {'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',},
            body: JSON.stringify(data),
        }).then((res) => {
            return this._check(res)
        });
    }

    deleteCard(id,token) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers:
            {'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',},
        }).then((res) => {
            return this._check(res)
        });
    }
    setUserInfo(data, token) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers:
            {'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',},
            body: JSON.stringify(data),
        }).then((res) => {
            return this._check(res)
        });
    }

    getUserInfo(token) {
        return fetch(`${this._url}/users/me`, {
                headers:
                {'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',}
            })
            .then((res) => {
                return this._check(res)
            })
    }
    setUserAvatar(data, token) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers:
            {'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',},
            body: JSON.stringify(data),
        }).then((res) => {
            return this._check(res)
        });
    }
    changeLikeCardStatus(id, cardIsLiked, token){
      return fetch(`${this._url}/cards/likes/${id}`, {
        method: cardIsLiked ? "PUT" : "DELETE",
        headers:
        {'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',},
    }).then((res) => {
        return this._check(res)
    });
    }
}

const api = new Api({
    url: 'https://SMBackendMesto.nomoredomains.rocks',
})

export default api;