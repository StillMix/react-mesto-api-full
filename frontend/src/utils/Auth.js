
export default class Auth {
  constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
  }

  _check(res) {
    if (res.status === 201) {
        return res.json();
    } else {
        return Promise.reject("Произошла ошибка");
    }
}

  register(password, email) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          password: password,
          email: email,
        })
    }).then((response) => {
      return this._check(response)
  })
    .then((res) => {
      return res;
    })
}

authorize(password, email) {
  return fetch(`${this._url}/signin`, {
    method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      })
  }) .then((response => {
    return response.json()
  }))
  .then((data) => {
    if (data.token){
      localStorage.setItem('token', data.token);
      return data;
    }else{
      return data
    }
  })
}

getContent(token){
  return fetch(`${this._url}/users/me`, {
    method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
  })
  .then(res => {return res.json()})
  .then(data => {return data})
}

}

export const mestoAuth = new Auth({
  url: 'https://auth.nomoreparties.co',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})


