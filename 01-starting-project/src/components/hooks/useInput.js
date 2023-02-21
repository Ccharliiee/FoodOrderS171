import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [inputStarted, setInputStarted] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = inputStarted && !valueIsValid;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setInputStarted(true);
  };

  const reset = () => {
    setEnteredValue("");
    setInputStarted(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
