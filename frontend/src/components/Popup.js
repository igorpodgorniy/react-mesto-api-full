import { useEffect } from "react";

const Popup = ({ isOpen, name, onClose, ariaLabel, children, ...props }) => {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`popup ${props.image ? 'popup_dark' : ''} ${isOpen && "popup_opened"}`}
      id={name}
      onClick={handleOverlay}
    >
      <div className={`popup__box${props.image ? '-image' : ''}`}>
        {children}
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
          aria-label={ariaLabel}>
        </button>
      </div>
    </div>
  );
};

  export default Popup;