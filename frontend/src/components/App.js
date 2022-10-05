import React from 'react';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ConfirmationPopup from './ConfirmationPopup';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import { CurrentUserContext} from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';

function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [emailUser, setEmailUser] = React.useState('');

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = React.useState(false);
  const [isRequestDonePopupOpen, setRequestDonePopupOpen] = React.useState(false);

  const [isRequestDone, setRequestDone] = React.useState(true);

  const [textSuccess, setTextSuccess] = React.useState('');

  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

  const [removalСard, setRemovalCard] = React.useState({});

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    Promise.all([api.getCards(), api.getUserInfo()])
    .then(([cardList, userInfo]) => {
      setCards(cardList);
      setCurrentUser(userInfo);
    })
    .catch(err => {
      console.log(err);
    });
  }, [loggedIn]);

  function tokenCheck() {
    auth.getContent()
        .then((res) => {
          if (res) {
            handleLogin();
            setEmailUser(res.data.email);
            history.push('/');
          }
        })
        .catch(err => {
          console.log(err);
        });
  }

  function signOut(){
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(e) {
    setSelectedCard(e);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmationPopupOpen(false);
    setSelectedCard({name: '', link: ''});
    setRequestDonePopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.likePost(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleOpenConfirmationPopup(card) {
    setRemovalCard(card);
    setConfirmationPopupOpen(true);
  }

  function handleCardDelete(e) {
    e.preventDefault();
    setIsLoading(true);
    api.deleteCard(removalСard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== removalСard._id));
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });;
  }

  function handleUpdateUser(newData) {
    setIsLoading(true);
    api.editProfile(newData)
      .then((data) => {
        setCurrentUser({...data});
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(newAvatarLink) {
    setIsLoading(true);
    api.changeAvatar(newAvatarLink)
      .then((data) => {
        setCurrentUser({...data});
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api.addCard(newCard)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleLoginSubmit(email, password) {
    auth.authorize(email, password)
      .then(() => {
        setEmailUser(email);
        setTextSuccess('Вы успешно вошли!');
        setRequestDone(true);
        setTimeout(() => {
          handleLogin();
          closeAllPopups();
          history.push('/');
        }, 1000);
      })
      .catch((err) => {
        setRequestDone(false);
        console.log(err);
      })
      .finally(() => {
        setRequestDonePopupOpen(true);
      });
  }

  function handleRegisterSubmit(email, password) {
    auth.register(email, password)
      .then((res) => {
        if (res.data) {
          setTextSuccess('Вы успешно зарегистрировались!');
          setRequestDone(true);
          setTimeout(() => {
            setRequestDonePopupOpen(false);
            history.push('/sign-in');
          }, 1000);
        }
      })
      .catch((err) => {
        setRequestDone(false);
        console.log(err);
      })
      .finally(() => {
        setRequestDonePopupOpen(true);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {loggedIn &&
        <Header>
          <p className='header__info'>{emailUser}
            <Link to='sign-in' onClick={signOut} className="header__link header__link_auth">Выйти</Link>
          </p>
        </Header>}
      <Switch>
        <ProtectedRoute
          exact
          path='/'
          loggedIn={loggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleOpenConfirmationPopup}
          cards={cards}
        />
        <Route path='/sign-in'>
          <Header>
            <Link to='sign-up' className="header__link">Регистрация</Link>
          </Header>
          <Login handleLogin={handleLoginSubmit}/>
        </Route>
        <Route path='/sign-up'>
          <Header>
            <Link to='sign-in' className="header__link">Войти</Link>
          </Header>
          <Register handleRegister={handleRegisterSubmit}/>
        </Route>
      </Switch>
      {loggedIn && <Footer />}
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddCard={handleAddPlaceSubmit}
        isLoading={isLoading}
      />
      <ConfirmationPopup
        isOpen={isConfirmationPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}
        isLoading={isLoading}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip
        isOpen={isRequestDonePopupOpen}
        isDone={isRequestDone}
        onClose={closeAllPopups}
        textSuccess={textSuccess}
        ariaLabel="Закрыть окно с результатом"
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
