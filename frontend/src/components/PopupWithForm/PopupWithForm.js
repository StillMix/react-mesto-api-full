import React from 'react';
import backBtn from '../../images/back-button.svg';


function PopupWithForm(props) {

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup__open' : ''}`}>
            <div className={`popup__background background-popup-${props.name}`}></div>
            <div className="popup__overlay">
                <button aria-label="Close" className={`popup__btn-back btn-back-popup-${props.name}`} type="button" onClick={props.onClose}><img src={backBtn} className="popup__image" alt="Кнопка назад"/></button>
                <h2 className="popup__title">{props.namePopup}</h2>
                <form onSubmit={props.submite && props.submite} name={`form-${props.name}-profile`} className={`form form_type_${props.name}`}>
                { props.children }
                    <button className={`popup__btn-create popup-btn-${props.btn}`} type="submit">{props.nameBtn}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;