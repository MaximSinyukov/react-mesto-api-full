import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const inputValue = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputValue.current.value
    });
  }

  return (
    <PopupWithForm  title="Обновить аватар" name="avatarPopup" submitButtonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
      <input type="url" className="popup__input popup__input_type_avatar" id="source" placeholder="Ссылка на аватарку" required name="object" ref={inputValue} />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
