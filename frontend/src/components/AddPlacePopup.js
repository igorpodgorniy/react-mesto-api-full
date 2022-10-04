import React from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';
import useValidation from '../hooks/useValidation';

function AddPlacePopup({isLoading, isOpen, onClose, onAddCard}) {
  const {values, handleChange, setValues} = useForm({name: '', link: ''});
  const nameValid = useValidation(true);
  const linkValid = useValidation(true);

  React.useEffect(() => {
    setValues({name: '', link: ''});
    nameValid.setErrorMessage('');
    linkValid.setErrorMessage('');
  }, [setValues, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddCard({
      ...values
    });
  }
  return (
    <PopupWithForm
      title='Новое место'
      name='popupAddPhoto'
      buttonText={isLoading ? 'Создание...' : 'Создать'}
      ariaLabel="Закрыть форму добавления фотографии"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={
        nameValid.isWrong
        || linkValid.isWrong
        || values.name === ""
        || values.link === ""
      }
      >
        <label className="popup__field">
          <input
            className="popup__input"
            type="text"
            id="name-photo-input"
            name="name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            value={values.name || ''}
            onChange={(e) => {
              handleChange(e);
              nameValid.validation(e);
            }}
            required
          />
          <span className="name-photo-input-error popup__input-error">
            {nameValid.isWrong && nameValid.errorMessage}
          </span>
        </label>
        <label className="popup__field">
          <input
            className="popup__input"
            type="url"
            id="link-photo-input"
            name="link"
            placeholder="Ссылка на картинку"
            value={values.link || ''}
            onChange={(e) => {
              handleChange(e);
              linkValid.validation(e);
            }}
            required
          />
          <span className="link-photo-input-error popup__input-error">
            {linkValid.isWrong && linkValid.errorMessage}
          </span>
        </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;