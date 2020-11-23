import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
  const userContext = React.useContext(CurrentUserContext);

  return (
    <main className="main">
        <section className="profile">
          <div className="profile__avatar">
            <img className="profile__img" src={userContext.avatar} alt="Ваш аватар" />
            <div className="profile__overlay" onClick={onEditAvatar}></div>
          </div>
          <div className="profile__info">
            <p className="profile__author">{userContext.name}</p>
            <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
            <p className="profile__subject">{userContext.about}</p>
          </div>
          <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
        </section>
        <section className="cards">
          {
          cards.map(({_id, ...props}) =>
          <Card key={_id} onCardLike={onCardLike} onCardDelete={onCardDelete} handleCardClick={onCardClick} cardId={_id} {...props} />)
          }
        </section>
      </main>
  );
}

export default Main;
