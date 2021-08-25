import React from 'react';
import avatarEdit from '../../images/avatar-edit.svg';
import Card from '../Card/Card.js';
import Header from '../header/Header';
import UserEmailInfo from '../userEmailInfo/userEmailInfo.js';
import {  useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/CurrentUserContext.js';

function Main(props) {
  const currentUser = React.useContext(UserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [avatar, setAvatar] = React.useState('');
  const history = useHistory();

React.useEffect(() => {
  currentUser && setName(currentUser.data.name)
  currentUser && setDescription(currentUser.data.about)
  currentUser && setAvatar(currentUser.data.avatar)
}, [currentUser]);

function signOut(){
  props.back()
  history.push('/sign-in');
}


    return (
      <>
        <UserEmailInfo email={props.email} isOpen={props.isOpenUserEmail} signOut={signOut}/>
        <Header>
        <button className={`${props.isOpenUserEmail ? 'header__close' : 'header__open'}`} type="button" onClick={props.onUserEmailOpen} ></button>
          <p className="header__email">{props.email}<span><button onClick={signOut} className="header__link header__button">Выйти</button></span></p>
        </Header>
<main className="content">
            <div className="profile">

                <img className="profile__avatar-edit" alt="Аватарка профиля" src={avatarEdit} onClick={props.onEditAvatar} />
                <img alt="Аватарка профиля" className="profile__avatar"  src={avatar}  />
                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__name">{name}</h1>
                        <button aria-label="Close" type="button" className="profile__btn-edit" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__status">{description}</p>
                </div>
                <button className="profile__btn-add" onClick={props.onAddPlace}></button>
            </div>
            <div className="cards">
                <ul className="elements">
                {props.cards && props.cards.data.map((card) => {
            return(
                <Card key={card._id} card={ {...card} }  onCardClick={props.onCardClick} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} />
            )
        })}
                </ul>
            </div>
        </main>
        </>
    );
}

export default Main;