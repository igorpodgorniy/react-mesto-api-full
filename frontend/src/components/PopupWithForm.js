import Popup from "./Popup";

function PopupWithForm({isOpen, name, title, buttonText, ariaLabel, onClose, onSubmit, onlyButton, isDisabled, children}) {
  return (
    <Popup isOpen={isOpen} name={name} ariaLabel={ariaLabel} onClose={onClose}>
      <form
        className="popup__container"
        method="post"
        name={name}
        onSubmit={onSubmit}
        noValidate>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button
          disabled={isDisabled}
          className={`popup__button ${onlyButton}`}
          type="submit">
            {buttonText}
        </button>
      </form>
    </Popup>
  )
}

export default PopupWithForm;