import React from 'react';
import backBtn from '../../images/back-button.svg';


function ImagePopup(props) {

    return (
        <div className={`popup popup-image ${props.isOpen ? 'popup__open' : ''}`}>
        <div className="popup__background popup-image__background"></div>
        <div className="popup-image__overlay">
            <img aria-label="Close" type="button" src={backBtn} className="popup__btn-back popup-image__btn-image" alt="Кнопка назад"  onClick={props.onClose}/>
            <img  className="popup-image__image" src={props.card && props.card.link} alt="картинка" />
            <p className="popup-image__title">{props.card && props.card.name} </p>
        </div>
    </div>
    );
}

export default ImagePopup;