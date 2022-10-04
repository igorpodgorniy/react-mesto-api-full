import React from 'react';
import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import useValidation from '../hooks/useValidation';

function Register({handleRegister}) {
  const {values, handleChange} = useForm({email: '', password: ''});
  const emailValid = useValidation(true);
  const passwordValid = useValidation(true);

  function handleSubmit(e) {
    e.preventDefault();

    handleRegister(values.email, values.password);
  }

  return(
    <form
      className="sign"
      method="post"
      onSubmit={handleSubmit}
      noValidate>
      <h2 className="sign__title">Регистрация</h2>
      <label className="sign__field">
        <input
          className="sign__input"
          type="email"
          name="email"
          minLength="6"
          value={values.email}
          onChange={(e) => {
            handleChange(e);
            emailValid.validation(e);
          }}
          placeholder="Email"
          required
        />
        <span className="popup__input-error">
          {emailValid.isWrong && emailValid.errorMessage}
        </span>
      </label>
      <label className="sign__field">
        <input
          className="sign__input"
          type="password"
          name="password"
          minLength="3"
          value={values.password}
          onChange={(e) => {
            handleChange(e);
            passwordValid.validation(e);
          }}
          placeholder="Пароль"
          required
        />
        <span className="popup__input-error">
          {passwordValid.isWrong && passwordValid.errorMessage}
        </span>
      </label>
      <button
        type="submit"
        className="sign__button"
        disabled={
          emailValid.isWrong
          || passwordValid.isWrong
          || values.email === ""
          || values.password === ""
        }
        >
        Зарегистрироваться
      </button>
      <p className="sign__text">Уже зарегистрированы? <Link to='./sign-in' className="sign__link">Войти</Link></p>
    </form>
  );
}

export default Register;