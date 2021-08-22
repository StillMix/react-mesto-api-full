import React,{useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from '../header/Header';

function SignIn(props) {
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
      <Link to="/sign-up" className="signup__link">Регистрация</Link>
      </Header>

      <div className="login">
        <p className="login__welcome">
             Вход
        </p>
        <form onSubmit={handleSubmit} name="sign-in" className="login__form">
        <label>
      <input id="profile-email-input" type="Email" placeholder="Email" value={formValues.EmailInput}  onChange={handleChange}  className="input input_type_email"  name="EmailInput" required minLength="2" maxLength="40" />
      <span className="popup__error profile-email-input-error"></span>
  </label>
  <label>
      <input id="profile-password-input" type="password" placeholder="Пароль" value={formValues.PasswordInput}  onChange={handleChange}  className="input input_type_password" name="PasswordInput" required minLength="2" maxLength="40" />
      <span className="popup__error profile-password-input-error"></span>
  </label>
            <button type="submit" className="login__btn">Войти</button>
        </form>
      </div>
      </>
    );
}

export default withRouter(SignIn);