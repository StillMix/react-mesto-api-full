import React from 'react';
import { UserContext } from '../../contexts/CurrentUserContext.js';

function Card(props) {
  const user = React.useContext(UserContext);
  function  handleLikeClick(){
    props.onCardLike(props.card)
  }
  function  handleDeleteClick(){
    props.onCardDelete(props.card)
  }
    function handleClick() {
        props.onCardClick(props.card.name, props.card.link);
      }
    return (
            <li className="element">
                <button type="button" className="element__btn-open" onClick={handleClick}><img className="element__image" alt="картинка карточки" src={props.card.link} /></button>
                <button className={`${props.card.owner === user.data._id ? 'element__basket' : 'element__basket-disactive'}`} type="button" onClick={handleDeleteClick}></button>
                <div className="element__container">
                    <h3 className="element__name">{props.card.name}</h3>
                    <button className={`element__heart ${props.card.likes.find(item => item === user.data._id) ? 'element__heart_active' : ''}`} onClick={handleLikeClick}></button>
                    <div className="element__likes">{props.card.likes.length}</div>

                </div>
            </li>





    );
}

export default Card;