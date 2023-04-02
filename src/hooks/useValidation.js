import { useEffect, useState } from "react";

export const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [minLengthError, setMinLengthError] = useState(false);
  const [inputValid, setInputValid] = useState(true);
  const [is18YearsOldError, setIs18YearsOldError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value?.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case "isEmpty":
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;
        case "is18YearsOld":
          const today = new Date();
          const minDate = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
          );
          const enteredDate = new Date(value);
          enteredDate > minDate
            ? setIs18YearsOldError(true)
            : setIs18YearsOldError(false);
          break;
        case "isPhoneNumber":
          const validPhone =
            /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/g;
          validPhone.test(String(value))
            ? setPhoneNumberError(false)
            : setPhoneNumberError(true);
          break;
        default:
          break;
      }
    }
  }, [value, validations]);

  useEffect(() => {
    if (
      isEmpty ||
      minLengthError ||
      is18YearsOldError ||
      phoneNumberError 
    ) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [
    isEmpty,
    minLengthError,
    is18YearsOldError,
    phoneNumberError,
  ]);

  return {
    isEmpty,
    minLengthError,
    is18YearsOldError,
    phoneNumberError,
    inputValid,
  };
};
