/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,  useCallback} from 'react';
import {  Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Main from './main/Main';
import Footer from './footer/Footer';
import PopupWithForm from './PopupWithForm/PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup.js';
import ImagePopup from './ImagePopup/ImagePopup.js';
import api from '../utils/Api.js';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import { UserContext} from '../contexts/CurrentUserContext.js';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup.js';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import {mestoAuth} from '../utils/Auth';
import InfoToolTip from './InfoToolTip/InfoToolTip';

function App(props) {
    const [loggedIn, setloggedIn] = useState(false);
    const [userEmail, setuserEmail] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setisImagePopupOpen] = useState(false);
    const [isInfoToolTip, setisInfoToolTip] = useState(false);
    const [selectedCard, setselectedCard] = useState(null);

    const ESCClose = useCallback((evt) => {
      if (evt.key === 'Escape') {
          closeAllPopups()
      };
  }, [])

function closeAllPopups(){
    setIsEditProfilePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisImagePopupOpen(false);
    setisInfoToolTip(false)
    setselectedCard(null);
    document.removeEventListener('keyup', ESCClose);
}
function handleUpdateUser(newUser){
  console.log(newUser.name, newUser.about)
  api.setUserInfo(newUser.name, newUser.about).then((data) =>{
    console.log(data)
    setCurrentUser(data)
    closeAllPopups()
  })
  .catch((err) => {
      console.log(err)
  });
}

function handleUpdateAvatar(newAvatar){
  api.setUserAvatar(newAvatar.avatar).then((data) =>{
    setCurrentUser(data)
    closeAllPopups()
  })
  .catch((err) => {
      console.log(err)
  });
}

React.useEffect(() => {
  api.getUserInfo().then((user) => {
    setCurrentUser(user)
  })
  .catch((err) => {
      console.log(err)
  });
},[])




function handleEditAvatarClick(){
    setisEditAvatarPopupOpen(true);
    document.addEventListener('keyup', ESCClose);
}
function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true)
    document.addEventListener('keyup', ESCClose);
}

function handleAddPlaceClick(){
    setisAddPlacePopupOpen(true)
    document.addEventListener('keyup', ESCClose);
}

///card
const [cards, setCards] = useState([])


   function getCards(){
    api.getCards().then((data) => {
        setCards(data)
    }).catch((err) => {
        console.log(err)
    })
  }

function handleCardLike(card) {
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  api.changeLikeCardStatus(card._id, !isLiked).then((data) => {
      setCards(data);
  }).catch((err) => {
    console.log(err)
});
}

function handleDeleteCard(card) {
api.deleteCard(card._id).then((data) =>
{
  setCards(data)
}).catch((err) => {
  console.log(err)
})

}

function addCard(newCard){
  const card = {
    name: newCard.name,
    link: newCard.link,
  }
  api.addCard(card.name, card.link).then((data)=>{
    setCards([data, ...cards]);
    closeAllPopups()
  })
  .catch((err) => {
      console.log(err)
  });

}

React.useEffect(() =>{
  getCards()
},[])

function handleCardClick(name, link){
    setisImagePopupOpen(true)
    setselectedCard({name, link})
}

function handleLogin(email){
  setuserEmail(email)
  setloggedIn(true)
}


function tokenCheck() {
    mestoAuth.getContent().then((res) => {
      if (res){
        const jwt = res;
        setloggedIn(true)
        setuserEmail(jwt.data.email)
        props.history.push('/main');

      }

    }).catch(err => console.log(err));
}

function login(log) {
  if (!log){
    return;
  }

  console.log(log)

  mestoAuth.authorize(log.PasswordInput,log.EmailInput).then((data) => {
    console.log(data);
    if (data){
          handleLogin(log.EmailInput);
          props.history.push('/main');
    }
  })
  .catch(err => console.log(err));
}


function register(reg) {
  mestoAuth.register(reg.PasswordInput,reg.EmailInput).then((res) => {
    if(res){
        props.history.push('/sign-in');

    } else {
      setisInfoToolTip(true)

    }
}).catch(err =>{
  console.log(err)
  setisInfoToolTip(true)
});
}


  React.useEffect(()=>{
    tokenCheck();
  },[])

    return (
       <UserContext.Provider value={currentUser}>
    <div className="body">
    <div className="page">
        <Switch>

        <ProtectedRoute
        onCardLike={handleCardLike} email={userEmail} onCardDelete={handleDeleteCard} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards}  onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
          path="/main"
          loggedIn={loggedIn}
          component={Main}
        />

        <Route exact path="/">
    {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
        </Route>

        <Route path="/sign-in">
        <SignIn handleLogin={handleLogin} handleSubmit={login}/>
        </Route>

        <Route path="/sign-up">
       <SignUp handleSubmit={register}/>
       </Route>

        </Switch>
        <Footer/>
        <InfoToolTip onClose={closeAllPopups} isOpen={isInfoToolTip}/>
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/>
        <PopupWithForm name="delete" onClose={closeAllPopups}   namePopup="Вы уверены?" btn="delete-card" nameBtn="Да"  />
        <EditAvatarPopup  onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup handleSubmit={addCard} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
    </div>

    </div>

    </UserContext.Provider>
    );
}

export default withRouter(App);