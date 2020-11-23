import React from 'react';
import logo from '../images/header__logo.svg';

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место" />
      <p className="header__mail">{(email !== 'Войти') ? ((email !== 'Регистрация') ? email : '') : ''}</p>
      <button className="header__button" onClick={onSignOut}>{(email === 'Войти') || (email === 'Регистрация') ? email : 'Выйти'}</button>
      <button className="header__mobile-button"></button>
    </header>
  );
}

export default Header;
