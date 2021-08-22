
import React,{useState} from 'react';

import Header from '../header/Header';
import { Link, withRouter } from 'react-router-dom';



function SignUp(props) {
  const [formValues, setFormValues] = useState({});


  function handleChange(e) {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  }



    function handleSubmit(event) {
      event.preventDefault();
     props.handleSubmit(formValues)
  }


    return (
      <>
      <Header>
      <Link to="/sign-in" className="signin__link">Войти</Link>
      </Header>
      <div className="register">
        <p className="register__welcome">
             Регистрация
        </p>
        <form onSubmit={handleSubmit} name="sign-up" className="register__form">
        <label>
      <input id="profile-email-input" type="Email" placeholder="Email" value={formValues.EmailInput}  onChange={handleChange}  className="input input_type_email"  name="EmailInput" required minLength="2" maxLength="40" />
      <span className="popup__error profile-email-input-error"></span>
  </label>
  <label>
      <input id="profile-password-input" type="password" placeholder="Пароль" value={formValues.PasswordInput}  onChange={handleChange}  className="input input_type_password" name="PasswordInput" required minLength="2" maxLength="40" />
      <span className="popup__error profile-password-input-error"></span>
  </label>
            <button type="submit" className="register__btn">Зарегистрироваться</button>
        </form>
        <div className="register__signin">
          <p className="register__text">Уже зарегистрированы?<span><Link to="/sign-in" className="register__login-link">Войти</Link></span></p>
        </div>
      </div>
      </>
    );
}

export default withRouter(SignUp);