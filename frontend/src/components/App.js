import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/api';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, Redirect, useHistory, withRouter } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

function App() {
  React.useEffect(() => { tokenCheck() }, []);

  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = React.useState(false);
  const [isInfoTooltipText, setIsInfoTooltipText] = React.useState('');
  const [selectedCard, setSelectedCard] = React.useState();
  const [currentUser, setCurrentUser] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');

  function handleSetEmail(data) {
    setEmail(data.email);
  }

  function handleRegister(data) {
    api.registerUser(data)
      .then((res) => {
        history.push('/sign-in');
        setIsInfoTooltipText('Вы успешно зарегистрировались!');
        setIsInfoTooltipOpen(true);
        setIsInfoTooltipSuccess(true);
      })
      .catch((err) => {
        setIsInfoTooltipText('Что-то пошло не так! Попробуйте еще раз.');
        setIsInfoTooltipOpen(true);
        setIsInfoTooltipSuccess(false);
      });
  }

  function handleHeaderButton() {
    if (email === 'Регистрация') {
      history.push('/sign-up');
    } else {
      if (email !== 'Войти') {
        api.logoutUser()
          .then(() => console.log('Необходима авторизация'))
          .catch((err) => console.log(err.message));
      }
      history.push('/sign-in');
    }
  }

  function handleLogin(data) {
    api.loginUser(data)
      .then((res) => {
        tokenCheck();
      })
      .catch((err) => {
        console.log(`Ошибка входа: ${err}`);
        setIsInfoTooltipText('Что-то пошло не так! Попробуйте еще раз.');
        setIsInfoTooltipOpen(true);
        setIsInfoTooltipSuccess(false);
      });
  }

  function tokenCheck() {
    api.getUser()
      .then((res) => {
        loginUser(res);
        history.push('/');
      })
      .catch((err) => console.log('Необходима авторизация'));
  }

  function loginUser(data) {
    setLoggedIn(true);
    handleSetEmail(data);
    setCurrentUser(data);
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err)=>{
        console.log(`Ошибка запроса карточек: ${err}`);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card.cardId, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card.cardId ? newCard : c);
        setCards(newCards);
      })
      .catch((err)=>{
        console.log(`Ошибка лайка: ${err}`);
      });
  }

  function handleCardDelete(id) {
    api.deleteCard(id.cardId)
      .then(() => {
        const newCards = cards.filter((c) => {
          return !(c._id === id.cardId)
        });
        setCards(newCards);
      })
      .catch((err)=>{
        console.log(`Ошибка удаления карточки: ${err}`);
      });
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (data) => {
    setSelectedCard(data);
  };

  const handleUpdateUser = (data) => {
    api.updateProfileInfo(data)
      .then((newProfile) => {
        setCurrentUser(newProfile);
        closeAllPopups();
      })
      .catch((err)=>{
        console.log(`Ошибка обновления профиля: ${err}`);
      });
  };

  const handleUpdateAvatar = (data) => {
    api.updateProfileAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err)=>{
        console.log(`Ошибка обновления аватара: ${err}`);
      });
  };

  const handleAddPlace = (data) => {
    api.createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err)=>{
        console.log(`Ошибка создания карточки: ${err}`);
      });
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard();
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={handleHeaderButton} />
        <Switch>
          <Route path="/sign-in">
            <Login onSetEmail={handleSetEmail} onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register onSetEmail={handleSetEmail} onRegister={handleRegister} />
          </Route>
          <ProtectedRoute path="/" loggedIn={loggedIn} component={Main} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <InfoTooltip isOpen={isInfoTooltipOpen} success={isInfoTooltipSuccess} onClose={closeAllPopups} successText={isInfoTooltipText} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
