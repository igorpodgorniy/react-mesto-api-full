import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext} from '../contexts/CurrentUserContext';
import useForm from '../hooks/useForm';
import useValidation from '../hooks/useValidation';

function EditProfilePopup({isLoading, isOpen, onClose, onUpdateUser}) {
  const {values, handleChange, setValues} = useForm({name: '', about: ''});
  const nameValid = useValidation(false);
  const aboutValid = useValidation(false);

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    });
    nameValid.setErrorMessage('');
    aboutValid.setErrorMessage('');
  }, [setValues, currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='popupEditProfile'
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      ariaLabel="Закрыть форму редактирования профиля"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={
        nameValid.isWrong
        || aboutValid.isWrong
        || values.name === ""
        || values.about === ""
      }>
        <label className="popup__field">
          <input
            className="popup__input"
            type="text"
            id="name-profile-input"
            name="name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            value={values.name || ''}
            onChange={(e) => {
              handleChange(e);
              nameValid.validation(e);
            }}
            required
          />
          <span className="name-profile-input-error popup__input-error">
            {nameValid.isWrong && nameValid.errorMessage}
          </span>
        </label>
        <label className="popup__field">
          <input
            className="popup__input"
            type="text"
            id="desc-profile-input"
            name="about"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            value={values.about || ''}
            onChange={(e) => {
              handleChange(e);
              aboutValid.validation(e);
            }}
            required
          />
          <span className="desc-profile-input-error popup__input-error">
            {aboutValid.isWrong && aboutValid.errorMessage}
          </span>
        </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;