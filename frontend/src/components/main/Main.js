import React from 'react';
import avatarEdit from '../../images/avatar-edit.svg';
import Card from '../Card/Card.js';
import Header from '../header/Header';
import {  useHistory } from 'react-router-dom';
import { Dimensions } from 'react-native';
import { UserContext } from '../../contexts/CurrentUserContext.js';
let deviceWidth = Dimensions.get('window').width

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

console.log(deviceWidth)

    return (
      <>
        <Header>
          {deviceWidth > 786 && <p className="header__email">{props.email}<span><button onClick={signOut} className="header__link header__button">Выйти</button></span></p>}
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