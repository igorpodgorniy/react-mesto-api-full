import React from 'react';
import { CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete ${!isOwn && 'card__delete_hidden'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__heart ${isLiked && 'card__heart_active'}`
  );

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  function handleClick() {
    onCardClick(card);
  }
  return(
    <li className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            type="button"
            onClick={handleCardLike}
            className={cardLikeButtonClassName}
            aria-label="Поставить лайк">
          </button>
          <span className="card__like-counter">
            {card.likes.length}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={handleCardDelete}
        className={cardDeleteButtonClassName}
        aria-label="Удалить фотографию">
      </button>
    </li>
  )
}

export default Card;