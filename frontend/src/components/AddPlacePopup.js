import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const inputPlaceName = React.useRef();
  const inputPlaceLink = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: inputPlaceName.current.value,
      object: inputPlaceLink.current.value
    });
  }

  return (
    <PopupWithForm  title="Новое место" name="addPopup" submitButtonText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
      <input type="text" className="popup__input" id="place" placeholder="Название" minLength="1" maxLength="30" required name="name" ref={inputPlaceName} />
      <span className="popup__text-error" id="place-error"></span>
      <input type="url" className="popup__input" id="source" placeholder="Ссылка на картинку" required name="object" ref={inputPlaceLink} />
      <span className="popup__text-error" id="source-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
