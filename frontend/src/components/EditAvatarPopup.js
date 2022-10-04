import React from 'react';
import useForm from '../hooks/useForm';
import PopupWithForm from './PopupWithForm';
import useValidation from '../hooks/useValidation';

function EditAvatarPopup({isLoading, isOpen, onClose, onUpdateAvatar}) {
  const {values, handleChange, setValues} = useForm({link: ''});
  const linkValid = useValidation(true);

  React.useEffect(() => {
    setValues({link: ''});
    linkValid.setErrorMessage('');
  }, [setValues, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(values.link);
  }

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='popupEditAvatar'
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      ariaLabel="Закрыть форму обновления аватара"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={linkValid.isWrong || values.link === ""}>
        <label className="popup__field">
          <input
            className="popup__input"
            type="url"
            id="link-avatar-input"
            name="link"
            value={values.link}
            placeholder="Ссылка на аватар"
            onChange={(e) => {
              handleChange(e);
              linkValid.validation(e);
            }}
            required
          />
          <span className="link-avatar-input-error popup__input-error">
            {linkValid.isWrong && linkValid.errorMessage}
          </span>
        </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;