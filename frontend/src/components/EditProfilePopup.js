import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      object: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);



  return (
    <PopupWithForm  title="Редактировать профиль" name="editPopup" submitButtonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
      <input type="text" value={name || ''} onChange={handleNameChange} className="popup__input" id="name" minLength="2" maxLength="40" placeholder="Имя" required name="name" />
      <span className="popup__text-error" id="name-error"></span>
      <input type="text" value={description || ''} onChange={handleDescriptionChange} className="popup__input" id="subject" placeholder="О себе" minLength="2" maxLength="200" required name="object" />
      <span className="popup__text-error" id="subject-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
