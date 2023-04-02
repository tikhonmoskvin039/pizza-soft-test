import { useState } from "react";
import { useValidation } from "./useValidation";

export const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue ? initialValue : "");
  const [isDirty, setIsDirty] = useState(false);

  const onChange = (e) => {
    const newValue =
    e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValue(newValue);
    setIsDirty(true);
  };

  const valid = useValidation(value, validations);

  const onBlur = (e) => {
    setIsDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};
