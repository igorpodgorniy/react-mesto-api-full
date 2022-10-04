import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmationPopup({isLoading, isOpen, onClose, onSubmit}) {
  return (
    <PopupWithForm
      title='Вы уверены?'
      name='popupDeletePhoto'
      buttonText={isLoading ? 'Удаление...' : 'Да'}
      ariaLabel="Закрыть форму удаления фотографии"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      onlyButton="popup__button_only-button"
    />
  )
}

export default ConfirmationPopup;