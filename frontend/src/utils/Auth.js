
export default class Auth {
  constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
  }

  _check(res) {
    if (res.status === 201) {
      console.log(res)
        return res.json();
    } else {
        return Promise.reject("Произошла ошибка");
    }
}

  register(password, email) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: password,
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
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password,
      })
  }).then((response => {
    return response.json()
  }))
  .then((data) => {
    if (data){
      return data;
    }
  })
}

getContent(){
  return fetch(`${this._url}/tokencheck`, {
    method: 'GET',
    credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': true,
          },
      })
      .then((res) => {
          return this._check(res)
      })
  .then(res => {return res.json()})
  .then(data => {return data})
}

}

export const mestoAuth = new Auth({
  url: 'https://SMBackendMesto.nomoredomains.rocks',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})


