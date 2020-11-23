import React from 'react';
import successfulImg from '../images/popup__successful-register.svg';
import errImg from '../images/popup__err-register.svg';

function InfoTooltip({ isOpen, success, successText, onClose }) {
  return (
    <div className={isOpen ? 'popup popup_opened': 'popup'}>
      <div className="popup__container popup__container_register">
        <button type="button" className="popup__close-button popup__close-button_register" onClick={onClose}></button>
        <img className="popup__image" src={success ? successfulImg : errImg} alt={success ? 'галочка в кружке' : 'крестик в кружке'}></img>
        <h2 className="popup__title popup__title_register">{successText}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
