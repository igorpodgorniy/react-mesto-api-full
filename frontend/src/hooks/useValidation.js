import { useState } from "react";

export default function useValidation(isValid) {
  const [isWrong, setIsWrong] = useState(isValid);
  const [errorMessage, setErrorMessage] = useState("");

  function validation(e) {
    if (!e.target.validity.valid) {
      setIsWrong(true);
      setErrorMessage(e.target.validationMessage);
    } else {
      setIsWrong(false);
      setErrorMessage("");
    }
  };

  return {isWrong, errorMessage, setErrorMessage, validation};
};