import React from 'react';
import { Link } from 'react-router-dom';

function Login({ onSetEmail, onLogin }) {
  React.useEffect(() => {onSetEmail({ email: 'Регистрация'})},[]);

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
    if (!email || !password){
      return;
    }
    onLogin({ password, email});
    setEmail('');
    setPassword('');
  }

  return (
    <div className="auth">
      <form className="auth__container" onSubmit={handleSubmit}>
        <h2 className="auth__title">Вход</h2>
        <input type="email" value={email} className="auth__input" placeholder="Email" required onChange={handleEmailChange} />
        <input type="password" value={password}  className="auth__input" placeholder="Пароль" required onChange={handlePasswordChange} />
        <button type="submit" className="auth__submit-button">Войти</button>
        <Link to="/sign-up" className="auth__redirect">Ещё не зарегистрированы? Регистрация</Link>
      </form>
    </div>
  );
}

export default Login;
