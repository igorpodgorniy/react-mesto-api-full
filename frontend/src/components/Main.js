import React from 'react';
import Card from './Card';
import { CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return(
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" onClick={props.onEditAvatar} src={currentUser.avatar} alt="Аватарка пользователя"/>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button type="button" onClick={props.onEditProfile} className="profile__edit-button" aria-label="Редактирование профиля"></button>
        </div>
        <button type="button" onClick={props.onAddPlace} className="profile__add-button" aria-label="Добавление фотографии"></button>
      </section>
      <section className="elements">
        <ul className="elements__items">
          {props.cards.map((card) => (
            <Card card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} key={card._id}/>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;