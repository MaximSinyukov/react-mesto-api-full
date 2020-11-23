import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onSetEmail, onRegister }) {
  React.useEffect(() => {onSetEmail({ email: 'Войти'})}, []);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ password, email})
  }

  return (
      <div className="auth">
        <form className="auth__container" onSubmit={handleSubmit}>
          <h2 className="auth__title">Регистрация</h2>
          <input type="email" value={email} className="auth__input" placeholder="Email" required onChange={handleEmailChange} />
          <input type="password" value={password} className="auth__input" placeholder="Пароль" required onChange={handlePasswordChange} />
          <button type="submit" className="auth__submit-button">Зарегистрироваться</button>
          <Link to="/sign-in" className="auth__redirect">Уже зарегистрированы? Войти</Link>
        </form>
      </div>
  );
}

export default Register;
