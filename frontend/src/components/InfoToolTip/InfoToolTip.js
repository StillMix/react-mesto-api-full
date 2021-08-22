import React from 'react';
import backBtn from '../../images/back-button.svg';
import  errorBtn  from '../../images/error.svg';


function InfoToolTip(props) {

    return (
     <>
     <div className={`infoToolTip ${props.isOpen ? 'popup__open' : ''}`}>
     <div className='infoToolTip__background'></div>
     <div className="infoToolTip__overlay">
     <button aria-label="Close" className='infoToolTip__btn' type="button" onClick={props.onClose}><img src={backBtn} className="infoToolTip__image" alt="Кнопка назад"/></button>
     <img src={errorBtn} alt='Ошибка' className="infoToolTip__error-btn"/>
     <p className='infoToolTip__text'>Что-то пошло не так! Попробуйте ещё раз.</p>
     </div>
     </div>
     </>
    );
}

export default InfoToolTip;