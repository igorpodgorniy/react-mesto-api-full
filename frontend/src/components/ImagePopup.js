import Popup from "./Popup";

function ImagePopup({card, onClose}) {
  return(
    <Popup isOpen={card.link} name='popupViewPhoto' ariaLabel='Закрыть окно просмотра фотографии' onClose={onClose} image={true}>
      <img
        className="popup__image"
        src={card.link}
        alt={card.name}
      />
      <h2 className="popup__title-image">{card.name}</h2>
    </Popup>
  )
}

export default ImagePopup;