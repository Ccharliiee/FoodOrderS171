import classes from "./Checkout.module.css";
import useInput from "../hooks/useInput";
import { postcodeValidator } from "postcode-validator";

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetnameInput,
  } = useInput((name) => name.trim() !== "");

  const {
    value: enteredAddress,
    isValid: enteredAddressIsValid,
    hasError: addressInputHasError,
    valueChangeHandler: addressChangedHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetaddressInput,
  } = useInput((address) => address.trim() !== "");

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput((city) => city.trim() !== "");

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalCodeInputHasError,
    valueChangeHandler: postalCodeChangedHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: resetEmailInput,
  } = useInput((postalCode) => postcodeValidator(postalCode, "US"));

  const fvalid4Sub =
    enteredNameIsValid &&
    enteredAddressIsValid &&
    enteredCityIsValid &&
    enteredPostalCodeIsValid;

  const confirmHandler = (event) => {
    event.preventDefault();
    nameBlurHandler();
    addressBlurHandler();
    cityBlurHandler();
    postalCodeBlurHandler();
    if (fvalid4Sub) {
      console.log("enteredName, enteredAddress, enteredCity enteredPostalCode");
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${nameInputHasError && classes.invalid}`}
      >
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className={classes.errortext}>Name must not be empty.</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          addressInputHasError && classes.invalid
        }`}
      >
        <label htmlFor="street">Street Address</label>
        <input
          type="text"
          id="street"
          onChange={addressChangedHandler}
          onBlur={addressBlurHandler}
          value={enteredAddress}
        />
        {addressInputHasError && (
          <p className={classes.errortext}>Street Address must not be empty.</p>
        )}
      </div>
      <div
        className={`${classes.control} ${cityInputHasError && classes.invalid}`}
      >
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangedHandler}
          onBlur={cityBlurHandler}
          value={enteredCity}
        />
        {cityInputHasError && (
          <p className={classes.errortext}>City must not be empty.</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          postalCodeInputHasError && classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postalCodeChangedHandler}
          onBlur={postalCodeBlurHandler}
          value={enteredPostalCode}
        />
        {postalCodeInputHasError && (
          <p className={classes.errortext}>Please enter a valid Postal Code.</p>
        )}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
